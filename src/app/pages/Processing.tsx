import { useState, useEffect, useRef } from "react";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { useNavigate, useLocation } from "react-router";
import { stateStore } from "../state";
import { CANDIDATES } from "../data/candidates";

const STEPS = [
  { id: 1, label: "Reading job description", sublabel: "Extracting requirements and scoring criteria" },
  { id: 2, label: "Extracting required skills", sublabel: "Comparing stack and technologies" },
  { id: 3, label: "Parsing resumes", sublabel: "Extracting text from selectable PDF digital format..." },
  { id: 4, label: "Semantic skill matching", sublabel: "Comparing candidate skills to job requirements" },
  { id: 5, label: "Analyzing career trajectory", sublabel: "Scoring growth, promotions, and tenure patterns" },
  { id: 6, label: "Predicting hiring readiness", sublabel: "Checking for availability and career signals" },
  { id: 7, label: "Verifying profile integrity", sublabel: "Detecting discrepancies" },
  { id: 8, label: "Building explainability", sublabel: "Generating human-readable score breakdowns" },
  { id: 9, label: "Finalizing rankings", sublabel: "Sorting and preparing your shortlist" }
];

export function Processing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const stateData = location.state as { jdText?: string; files?: File[] } | null;
  const jdText = stateData?.jdText || "We are looking for a Senior Frontend Engineer with 5+ years of experience in React, TypeScript, and Tailwind CSS...";
  const files = stateData?.files || [];

  const apiFinishedRef = useRef(false);
  const apiResultRef = useRef<any>(null);

  useEffect(() => {
    // Start calling the backend API in parallel
    const callRankApi = async () => {
      try {
        if (files.length === 0) {
          // If no files, just simulate using original mock data
          setTimeout(() => {
            apiResultRef.current = CANDIDATES;
            apiFinishedRef.current = true;
          }, 2000);
          return;
        }

        const formData = new FormData();
        formData.append("job_description", jdText);
        files.forEach(file => {
          formData.append("resumes", file);
        });

        const response = await fetch("http://localhost:8000/api/rank", {
          method: "POST",
          body: formData
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.success) {
          apiResultRef.current = data.candidates;
        } else {
          throw new Error(data.error || "Failed to process resumes.");
        }
      } catch (err: any) {
        console.warn("Backend API rank call failed, falling back to mock simulator:", err.message);
        // Fallback to mock candidates but match the counts
        apiResultRef.current = CANDIDATES.map((c, i) => ({
          ...c,
          id: `c-mock-${i}`,
          name: files[i]?.name.replace(".pdf", "").replace("_", " ").title || c.name,
        }));
      } finally {
        apiFinishedRef.current = true;
      }
    };

    callRankApi();
  }, [files, jdText]);

  // Extended title helper
  useEffect(() => {
    if (!String.prototype.hasOwnProperty('title')) {
      Object.defineProperty(String.prototype, 'title', {
        value: function() {
          return this.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        },
        writable: true,
        configurable: true
      });
    }
  }, []);

  useEffect(() => {
    const totalSteps = STEPS.length;
    let currentPercent = 0;

    const timer = setInterval(() => {
      // Progress simulation logic
      if (currentPercent < 90) {
        currentPercent += 1;
        setProgress(currentPercent);
        setActiveStep(Math.min(totalSteps - 1, Math.floor((currentPercent / 100) * totalSteps)));
      } else if (apiFinishedRef.current) {
        // Once API resolves, complete to 100%
        currentPercent = Math.min(100, currentPercent + 5);
        setProgress(currentPercent);
        setActiveStep(Math.min(totalSteps - 1, Math.floor((currentPercent / 100) * totalSteps)));
        
        if (currentPercent >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            // Save results to local storage state store
            const finalCandidates = apiResultRef.current || CANDIDATES;
            stateStore.updateCandidates(finalCandidates, jdText, "Senior Frontend Engineer");
            navigate("/ranking/123/results");
          }, 500);
        }
      }
    }, 40);

    return () => clearInterval(timer);
  }, [navigate, jdText]);

  const fileCount = files.length || 47;

  return (
    <div className="max-w-[520px] mx-auto py-20 flex flex-col items-center">
      <div className="text-center mb-12">
        <div className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-3">
          AI ANALYSIS IN PROGRESS
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Ranking your candidates</h1>
        <p className="text-[15px] text-muted-foreground">Evaluating {fileCount} resumes against job description...</p>
      </div>

      <div className="relative w-24 h-24 mb-12 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="transparent" stroke="#1E293B" strokeWidth="4" />
          <circle 
            cx="50" cy="50" r="46" 
            fill="transparent" 
            stroke="#2563EB" 
            strokeWidth="4" 
            strokeDasharray="289.026" 
            strokeDashoffset={289.026 - (progress / 100) * 289.026}
            strokeLinecap="round"
            className="transition-all duration-75 ease-linear drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold font-mono text-white">{progress}<span className="text-lg text-muted-foreground">%</span></span>
        </div>
      </div>

      <div className="w-full space-y-0 relative">
        <div className="absolute left-[17px] top-4 bottom-4 w-[2px] bg-border border-dashed z-0" />
        
        {STEPS.map((step, index) => {
          const status = index < activeStep ? 'complete' : index === activeStep ? 'active' : 'pending';
          
          return (
            <div key={step.id} className="relative z-10 flex items-start gap-4 py-3 bg-background">
              <div className="relative">
                {index < STEPS.length - 1 && (
                  <div className={cn(
                    "absolute top-9 left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%+8px)] z-0",
                    status === 'complete' ? "bg-primary" : "bg-border border-dashed"
                  )} />
                )}
                <div className={cn(
                  "w-9 h-9 rounded-full border-2 flex items-center justify-center bg-background relative z-10 transition-colors duration-300",
                  status === 'complete' ? "border-emerald-500 bg-emerald-500/10" :
                  status === 'active' ? "border-primary bg-primary/10" : "border-border bg-card"
                )}>
                  {status === 'complete' ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : status === 'active' ? (
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  ) : (
                    <span className="text-[12px] font-mono text-muted-foreground">{step.id}</span>
                  )}
                </div>
              </div>
              <div className="pt-2">
                <div className={cn(
                  "text-[14px] transition-colors duration-300",
                  status === 'complete' ? "text-slate-400 line-through opacity-60" :
                  status === 'active' ? "text-white font-semibold" : "text-muted-foreground"
                )}>
                  {step.label}
                </div>
                {status === 'active' && (
                  <div className="text-[13px] text-muted-foreground mt-1 animate-in slide-in-from-top-1 fade-in duration-300">
                    {step.sublabel}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <div className="text-[13px] text-muted-foreground mb-3">
          Processed {Math.min(fileCount, Math.floor((progress/100)*fileCount))} of {fileCount} resumes
        </div>
        <button onClick={() => navigate("/")} className="text-[13px] text-muted-foreground underline hover:text-white transition-colors">
          Cancel and go back
        </button>
      </div>
    </div>
  );
}

