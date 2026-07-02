import { useState, useRef } from "react";
import { UploadCloud, Sparkles, Users2, TrendingUp, Briefcase, Clock, FileText, X, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router";
import { authStore } from "../auth";
import { stateStore } from "../state";

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  }).toUpperCase();
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/** Extract basic keywords from JD text for preview */
function extractKeywords(text: string): string[] {
  const techWords = [
    'React','TypeScript','JavaScript','Python','Node.js','GraphQL','Kubernetes',
    'Docker','AWS','GCP','Azure','PostgreSQL','MongoDB','Redis','Go','Rust','Java',
    'Next.js','Vue','Angular','Tailwind','CSS','HTML','SQL','REST','CI/CD','Git',
    'Terraform','Kafka','Spark','ML','AI','TensorFlow','PyTorch','FastAPI','Django',
    'Spring','Microservices','gRPC','WebRTC','Swift','Kotlin','Flutter','React Native',
    'Figma','Sketch','Product','Leadership','Agile','Scrum','Communication'
  ];
  const lower = text.toLowerCase();
  return techWords.filter(w => lower.includes(w.toLowerCase())).slice(0, 8);
}

function extractYearsExp(text: string): string | null {
  const m = text.match(/(\d+)\+?\s+years?/i);
  return m ? `${m[1]}+ years of experience required` : null;
}

export function Dashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsed, setParsed] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [jdText, setJdText] = useState("");
  const [error, setError] = useState("");

  const user = authStore.getUser();
  const firstName = user?.name?.split(' ')[0] || 'there';

  // Real KPIs from stateStore
  const appState = stateStore.get();
  const candidates = appState.candidates;
  const totalProcessed = candidates.length;
  const avgScore = totalProcessed > 0
    ? (candidates.reduce((s, c) => s + (c.final_score || 0), 0) / totalProcessed).toFixed(1)
    : '—';
  const hoursSaved = Math.round(totalProcessed * 4.5);
  const topPicks = candidates.filter(c => (c.final_score || 0) >= 80).length;

  const extractedKeywords = parsed ? extractKeywords(jdText) : [];
  const yearsLine = parsed ? extractYearsExp(jdText) : null;

  const handleParseJD = () => {
    if (!jdText.trim()) {
      setError("Please paste a job description first.");
      return;
    }
    setError("");
    setParsed(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const pdfs = Array.from(e.target.files).filter(f => f.type === "application/pdf" || f.name.endsWith(".pdf"));
      if (pdfs.length < e.target.files.length) {
        setError("Only PDF files are supported.");
      }
      setFiles(prev => [...prev, ...pdfs]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = () => {
    if (!jdText.trim()) { setError("Please add a job description."); return; }
    if (files.length === 0) { setError("Please upload at least one resume PDF."); return; }
    setError("");
    navigate("/ranking/process", { state: { jdText, files } });
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Greeting Header */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
          {formatDate()}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          {getGreeting()}, {firstName}.
        </h1>
        <p className="text-muted-foreground text-[15px]">
          {totalProcessed > 0
            ? `${totalProcessed} candidates ranked · ${topPicks} top picks · ${hoursSaved}h saved`
            : 'Upload resumes and a job description to get started.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">

          {/* JD Card */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 md:p-8">
            <div className="flex justify-between items-center mb-5">
              <div>
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                  JOB DESCRIPTION
                </div>
                <h3 className="text-lg font-semibold text-foreground">What role are you hiring for?</h3>
              </div>
              {!parsed && (
                <button
                  onClick={handleParseJD}
                  className="h-8 px-4 border border-border hover:bg-muted rounded-lg text-sm font-medium text-foreground transition-colors"
                >
                  Parse JD
                </button>
              )}
              {parsed && (
                <button
                  onClick={() => { setParsed(false); }}
                  className="h-8 px-4 border border-border hover:bg-muted rounded-lg text-sm font-medium text-muted-foreground transition-colors"
                >
                  Edit JD
                </button>
              )}
            </div>

            <textarea
              className="w-full bg-transparent border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground min-h-[180px] resize-y"
              placeholder="Paste the full job description here — title, responsibilities, required skills, experience level..."
              value={jdText}
              onChange={(e) => { setJdText(e.target.value); if (parsed) setParsed(false); }}
              disabled={parsed}
            />

            {parsed && (
              <div className="mt-6 pt-6 border-t border-border animate-in fade-in slide-in-from-top-2">
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                  EXTRACTED REQUIREMENTS
                </div>
                {extractedKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {extractedKeywords.map((k, i) => (
                      <span key={i} className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full px-3 py-1 text-[13px] font-medium">
                        {k}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-muted-foreground mb-3">
                    Job description parsed — AI will match all requirements.
                  </p>
                )}
                {yearsLine && <p className="text-[13px] text-muted-foreground">{yearsLine}</p>}
              </div>
            )}
          </div>

          {/* Upload Card */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 md:p-8">
            <div className="mb-5">
              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                RESUMES
              </div>
              <h3 className="text-lg font-semibold text-foreground">Upload candidate resumes</h3>
              <p className="text-[13px] text-muted-foreground mt-1">PDF format, up to 100 files, 10MB each</p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept=".pdf,application/pdf"
              className="hidden"
            />

            <div
              className={cn(
                "border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer",
                dragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-card/40 hover:border-muted-foreground hover:bg-card/60",
                files.length > 0 && "mb-5"
              )}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const pdfs = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith(".pdf"));
                if (pdfs.length) setFiles(prev => [...prev, ...pdfs]);
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-base font-medium text-foreground mb-1">
                {dragging ? "Release to upload" : "Drop resumes here"}
              </h4>
              <p className="text-[13px] text-muted-foreground">or click to browse PDF files</p>
            </div>

            {files.length > 0 && (
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[13px] font-medium text-foreground">{files.length} file{files.length > 1 ? 's' : ''} selected</h4>
                  <button onClick={() => setFiles([])} className="text-[13px] text-muted-foreground hover:text-foreground">Clear all</button>
                </div>
                <div className="max-h-[160px] overflow-y-auto space-y-1 pr-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted group">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-[13px] text-foreground truncate max-w-[200px]">{f.name}</span>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {f.size > 0 ? `${(f.size / 1024 / 1024).toFixed(1)} MB` : "PDF"}
                        </span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-[13px] px-4 py-3">
              {error}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!jdText.trim() || files.length === 0}
            className="w-full h-[52px] rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-primary/90 transition-all disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none disabled:cursor-not-allowed group relative"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate AI Ranking</span>
            <span className="absolute right-4 text-[11px] font-mono text-primary-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity">
              ⌘ ↵
            </span>
          </button>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-6 self-start">
          {/* KPI Grid */}
          <div className="grid grid-cols-2 gap-4">
            <KPICard
              label="Candidates ranked"
              value={totalProcessed > 0 ? totalProcessed.toLocaleString() : '—'}
              trend={totalProcessed > 0 ? `${topPicks} top picks (≥80)` : 'No ranking yet'}
              trendUp={topPicks > 0}
              icon={Users2}
              color="primary"
            />
            <KPICard
              label="Avg. AI score"
              value={avgScore}
              trend={totalProcessed > 0 ? '↑ from Groq AI' : 'No data yet'}
              trendUp={parseFloat(avgScore) >= 70}
              icon={TrendingUp}
              color="success"
            />
            <KPICard
              label="Top picks"
              value={topPicks > 0 ? topPicks.toString() : '—'}
              trend="Score ≥ 80"
              trendUp={topPicks > 0}
              icon={Briefcase}
              color="info"
            />
            <KPICard
              label="Hours saved"
              value={hoursSaved > 0 ? `${hoursSaved}h` : '—'}
              trend="vs manual screening"
              trendUp={hoursSaved > 0}
              icon={Clock}
              color="secondary"
            />
          </div>

          {/* Recent Results or Empty State */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-foreground">Recent results</h3>
              {candidates.length > 0 && (
                <button
                  onClick={() => navigate("/ranking/123/results")}
                  className="text-[13px] text-primary hover:underline flex items-center gap-1"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {candidates.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">No rankings yet</p>
                <p className="text-[13px] text-muted-foreground">
                  Add a job description and upload resumes to run your first AI ranking.
                </p>
              </div>
            ) : (
              <div className="space-y-0">
                {candidates.slice(0, 5).map((c, i) => (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/candidates/${c.id}`)}
                    className={cn(
                      "py-3.5 flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors",
                      i < candidates.length - 1 && i < 4 && "border-b border-border"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {c.initials || c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-foreground">{c.name}</div>
                        <div className="text-[12px] text-muted-foreground">{c.role}</div>
                      </div>
                    </div>
                    <span className={cn(
                      "text-[13px] font-bold font-mono px-2 py-0.5 rounded-full",
                      (c.final_score || 0) >= 80
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    )}>
                      {c.final_score}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, trend, trendUp, icon: Icon, color }: any) {
  const colorMap: Record<string, string> = {
    primary: "bg-blue-500/10 text-blue-500",
    success: "bg-emerald-500/10 text-emerald-500",
    info: "bg-sky-500/10 text-sky-500",
    secondary: "bg-purple-500/10 text-purple-500"
  };
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
      <div className="flex items-start gap-3">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", colorMap[color])}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{label}</div>
          <div className="text-[32px] leading-none font-bold text-foreground font-mono mt-2 mb-1">{value}</div>
          <div className={cn("text-[13px]", trendUp ? "text-emerald-500" : "text-muted-foreground")}>{trend}</div>
        </div>
      </div>
    </div>
  );
}
