<div align="center">
  <div style="background-color: #2563EB; width: 64px; height: 64px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
    <span style="color: white; font-size: 32px; font-weight: bold; font-family: monospace;">T</span>
  </div>
  <h1>TalentGraph AI</h1>
  <p><strong>Next-Generation AI-Powered Resume Screening & Candidate Intelligence Platform</strong></p>
</div>

<br/>

TalentGraph AI is a production-ready web application designed to completely automate the initial stages of technical recruiting. By leveraging LLMs (Large Language Models), TalentGraph analyzes candidate resumes against your specific Job Descriptions, generating comprehensive insights, skill gap analysis, and unbiased ranking scores in seconds.

## ✨ Key Features

- **🧠 Real-time AI Inference:** Powered natively by `llama-3.3-70b` via the Groq API (with Google Gemini fallback) for instantaneous parsing and scoring.
- **📊 Granular Explainability:** Don't just get a score. Every candidate receives a detailed breakdown including Semantic Match, Career Growth trajectory, Hiring Readiness, and Leadership Signals.
- **🔍 Matched vs. Missing Skills:** Automatically extracts the candidate's verified skills and highlights critical missing technologies based directly on the Job Description.
- **⚔️ Radar Comparisons:** Select up to 3 candidates and visually compare their strengths and weaknesses using interactive multidimensional radar charts.
- **🔒 Persistent & Secure:** Integrated with MongoDB Atlas to safely store user accounts, sessions, and encrypted credentials. 
- **🎨 Premium UI/UX:** A stunning, responsive interface with built-in Dark/Light modes, fluid micro-animations, and dynamic data visualizers built with Tailwind CSS and Recharts.

---

## 🛠️ Technology Stack

**Frontend**
- React 18 + Vite
- TypeScript
- Tailwind CSS (Styling & Animations)
- Lucide React (Iconography)
- Recharts (Data Visualization)
- Zustand (Local State Management)

**Backend**
- Django (Python 3)
- PyMongo & DNSPython (MongoDB Atlas connection)
- PyPDF2 (Resume text extraction)
- Requests (API inference)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster URI
- A [Groq API Key](https://console.groq.com/)

### 1. Environment Configuration

Navigate to the `backend/` directory and ensure your `.env` file is properly configured with your keys:

```env
# backend/.env
GROQ_API_KEY="gsk_your_groq_api_key"
GEMINI_API_KEY="AIza_your_gemini_api_key_fallback"
MONGO_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net"
```

### 2. Start the Backend

The backend utilizes an automated startup script that manages the Python virtual environment, installs requirements, and starts the Django server on `http://localhost:8000`.

```bash
# In the root project directory
chmod +x start_backend.sh
./start_backend.sh
```

### 3. Start the Frontend

In a separate terminal, install the Node dependencies and start the Vite development server.

```bash
# In the root project directory
npm install
npm run dev
```

The application will now be running at `http://localhost:5173`. 

---

## 💡 Usage Guide

1. **Register/Login:** Create a new user account. Your session will be securely stored in your connected MongoDB instance.
2. **Dashboard:** Start a new ranking job by pasting your Job Description into the text area.
3. **Upload:** Drag and drop candidate resumes (PDF format).
4. **Process:** TalentGraph will extract the text, ping the Groq AI, and render the results in real-time.
5. **Explore:** Click on any candidate to view their dedicated Profile, or use the checkbox selections to Compare candidates or export to CSV.

---

## 🔒 Privacy & Security Note
*API keys are securely loaded on the backend via environment variables and are **never** exposed to the browser client. Ensure you never commit your `backend/.env` file to public version control.*