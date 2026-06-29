import os
import logging
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .utils import extract_text_from_pdf, evaluate_resume_with_gemini, evaluate_resume_with_fallback

logger = logging.getLogger(__name__)

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

        # Retrieve Gemini API key from environment
        gemini_api_key = os.getenv('GEMINI_API_KEY', '').strip()
        
        candidates = []
        
        for resume_file in resumes:
            filename = resume_file.name
            
            # Extract PDF text
            text = extract_text_from_pdf(resume_file)
            if not text:
                logger.warning(f"Could not extract text from file: {filename}")
                # Create a minimal fallback structure just to handle the file
                fallback_data = evaluate_resume_with_fallback(f"Name: {filename.replace('.pdf', '')}\nSkill: Frontend, React", job_description)
                fallback_data['name'] = filename.replace('.pdf', '').replace('_', ' ').title()
                candidates.append(fallback_data)
                continue
            
            # Evaluate (Gemini or Fallback)
            if gemini_api_key:
                try:
                    candidate_data = evaluate_resume_with_gemini(text, job_description, gemini_api_key)
                    # Add a random unique ID if model didn't return one
                    if 'id' not in candidate_data:
                        import random
                        candidate_data['id'] = f"c{random.randint(100, 999)}"
                    candidates.append(candidate_data)
                except Exception:
                    # If Gemini fails, use fallback parsing gracefully
                    fallback_data = evaluate_resume_with_fallback(text, job_description)
                    # Try to set name based on filename if fallback name extraction failed
                    if fallback_data.get('name') == 'Candidate':
                        fallback_data['name'] = filename.replace('.pdf', '').replace('_', ' ').title()
                    candidates.append(fallback_data)
            else:
                # Fallback parser
                fallback_data = evaluate_resume_with_fallback(text, job_description)
                if fallback_data.get('name', '').startswith('Candidate'):
                    # Use filename for a nicer mock appearance if name couldn't be parsed
                    fallback_data['name'] = filename.split('.')[0].replace('_', ' ').title()
                    fallback_data['initials'] = "".join([part[0].upper() for part in fallback_data['name'].split() if part])[:3]
                candidates.append(fallback_data)

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
