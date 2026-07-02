import os
import json
import secrets
import hashlib
import logging
from datetime import datetime, timedelta

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from .utils import extract_text_from_pdf, evaluate_resume_with_groq, evaluate_resume_with_gemini, evaluate_resume_with_fallback
from pymongo import MongoClient

logger = logging.getLogger(__name__)

# ─── MongoDB Connection ────────────────────────────────────────────────────────
MONGO_URI = os.getenv("MONGO_URI", "").strip()
if MONGO_URI:
    mongo_client = MongoClient(MONGO_URI)
    db = mongo_client['talentgraph']
    users_collection = db['users']
    tokens_collection = db['tokens']
else:
    logger.warning("MONGO_URI is not set. Database integration will fail.")
    users_collection = None
    tokens_collection = None

def _hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def _generate_token() -> str:
    return secrets.token_hex(32)

def _get_initials(name: str) -> str:
    parts = name.strip().split()
    return "".join(p[0].upper() for p in parts if p)[:3]


# ─── Auth Views ───────────────────────────────────────────────────────────────

@csrf_exempt
@require_POST
def register(request):
    """POST /api/auth/register/ — Create a new account."""
    try:
        body = json.loads(request.body)
        name = body.get("name", "").strip()
        email = body.get("email", "").strip().lower()
        password = body.get("password", "").strip()
        company = body.get("company", "").strip()

        if not name or not email or not password:
            return JsonResponse({"error": "Name, email, and password are required."}, status=400)

        if len(password) < 8:
            return JsonResponse({"error": "Password must be at least 8 characters."}, status=400)

        if users_collection is None:
            return JsonResponse({"error": "Database not configured."}, status=500)

        if users_collection.find_one({"email": email}):
            return JsonResponse({"error": "An account with this email already exists."}, status=409)

        password_hash = _hash_password(password)
        initials = _get_initials(name)

        users_collection.insert_one({
            "email": email,
            "name": name,
            "company": company,
            "initials": initials,
            "password_hash": password_hash,
            "created_at": datetime.utcnow().isoformat(),
        })

        token = _generate_token()
        tokens_collection.insert_one({
            "token": token,
            "email": email,
            "created_at": datetime.utcnow().isoformat()
        })

        return JsonResponse({
            "token": token,
            "name": name,
            "email": email,
            "initials": initials,
        }, status=201)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON body."}, status=400)
    except Exception as e:
        logger.exception("Error in register view")
        return JsonResponse({"error": f"Internal server error: {str(e)}"}, status=500)


@csrf_exempt
@require_POST
def login(request):
    """POST /api/auth/login/ — Authenticate and return a token."""
    try:
        body = json.loads(request.body)
        email = body.get("email", "").strip().lower()
        password = body.get("password", "").strip()

        if not email or not password:
            return JsonResponse({"error": "Email and password are required."}, status=400)

        if users_collection is None:
            return JsonResponse({"error": "Database not configured."}, status=500)

        user = users_collection.find_one({"email": email})
        if not user:
            return JsonResponse({"error": "No account found with this email."}, status=401)

        if user["password_hash"] != _hash_password(password):
            return JsonResponse({"error": "Incorrect password. Please try again."}, status=401)

        token = _generate_token()
        tokens_collection.insert_one({
            "token": token,
            "email": email,
            "created_at": datetime.utcnow().isoformat()
        })

        return JsonResponse({
            "token": token,
            "name": user["name"],
            "email": email,
            "initials": user["initials"],
        })

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON body."}, status=400)
    except Exception as e:
        logger.exception("Error in login view")
        return JsonResponse({"error": f"Internal server error: {str(e)}"}, status=500)


@csrf_exempt
@require_POST
def logout(request):
    """POST /api/auth/logout/ — Invalidate the token."""
    token = request.headers.get("Authorization", "").removeprefix("Bearer ").strip()
    if tokens_collection is not None and token:
        tokens_collection.delete_one({"token": token})
    return JsonResponse({"success": True})


@require_GET
def me(request):
    """GET /api/auth/me/ — Return current user info (requires auth token)."""
    if tokens_collection is None:
        return JsonResponse({"error": "Database not configured."}, status=500)

    token = request.headers.get("Authorization", "").removeprefix("Bearer ").strip()
    token_doc = tokens_collection.find_one({"token": token})
    
    if not token_doc:
        return JsonResponse({"error": "Unauthorized."}, status=401)

    email = token_doc["email"]
    user = users_collection.find_one({"email": email})
    
    if not user:
        return JsonResponse({"error": "User not found."}, status=404)

    return JsonResponse({
        "name": user["name"],
        "email": email,
        "initials": user.get("initials", ""),
        "company": user.get("company", ""),
    })


# ─── Resume Ranking View (existing) ──────────────────────────────────────────

@csrf_exempt
@require_POST
def rank_candidates(request):
    """
    POST API to process resumes and rank them against a job description.
    Accepts:
        - job_description (text)
        - resumes (list of PDF files in multipart/form-data)
    """
    try:
        # Retrieve parameters
        job_description = request.POST.get('job_description', '').strip()
        resumes = request.FILES.getlist('resumes')

        if not job_description:
            return JsonResponse({'error': 'Job description is required.'}, status=400)
        
        if not resumes:
            return JsonResponse({'error': 'No resumes were uploaded.'}, status=400)

        # Retrieve API keys from environment (Groq preferred, Gemini as fallback)
        groq_api_key = os.getenv('GROQ_API_KEY', '').strip()
        gemini_api_key = os.getenv('GEMINI_API_KEY', '').strip()
        
        candidates = []
        
        for resume_file in resumes:
            filename = resume_file.name
            
            # Extract PDF text
            text = extract_text_from_pdf(resume_file)
            if not text:
                logger.warning(f"Could not extract text from file: {filename}")
                fallback_data = evaluate_resume_with_fallback(f"Name: {filename.replace('.pdf', '')}\nSkill: Frontend, React", job_description)
                fallback_data['name'] = filename.replace('.pdf', '').replace('_', ' ').title()
                candidates.append(fallback_data)
                continue
            
            candidate_data = None

            # Try Groq first (fastest)
            if groq_api_key:
                try:
                    candidate_data = evaluate_resume_with_groq(text, job_description, groq_api_key)
                    logger.info(f"Groq AI ranked: {filename}")
                except Exception as e:
                    logger.warning(f"Groq failed for {filename}: {e}")

            # Try Gemini if Groq failed or not configured
            if candidate_data is None and gemini_api_key and not gemini_api_key.startswith('your_'):
                try:
                    candidate_data = evaluate_resume_with_gemini(text, job_description, gemini_api_key)
                    logger.info(f"Gemini AI ranked: {filename}")
                except Exception as e:
                    logger.warning(f"Gemini failed for {filename}: {e}")

            # Final fallback: regex-based scorer
            if candidate_data is None:
                logger.info(f"Using fallback scorer for: {filename}")
                candidate_data = evaluate_resume_with_fallback(text, job_description)
                if candidate_data.get('name', '').startswith('Candidate'):
                    candidate_data['name'] = filename.split('.')[0].replace('_', ' ').title()
                    candidate_data['initials'] = "".join([p[0].upper() for p in candidate_data['name'].split() if p])[:3]

            if 'id' not in candidate_data:
                import random as _rand
                candidate_data['id'] = f"c{_rand.randint(100, 999)}"

            candidates.append(candidate_data)

        # Sort candidates by final_score descending
        candidates.sort(key=lambda x: x.get('final_score', 0), reverse=True)
        
        # Assign ranks
        for idx, candidate in enumerate(candidates):
            candidate['overall_rank'] = idx + 1
            
        return JsonResponse({
            'success': True,
            'job_description': job_description,
            'candidates': candidates
        })
        
    except Exception as e:
        logger.exception("Unexpected error in ranking api")
        return JsonResponse({'error': f"Internal server error: {str(e)}"}, status=500)
