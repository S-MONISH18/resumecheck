import { useState, useRef } from "react";
import { UploadCloud, Sparkles, Users2, TrendingUp, Briefcase, Clock, FileText, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router";

export function Dashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsed, setParsed] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  
  const defaultJd = "We are looking for a Senior Frontend Engineer with 5+ years of experience in React, TypeScript, and Tailwind CSS...";
  const [jdText, setJdText] = useState("");

  const handleParseJD = () => {
    setParsed(true);
    if (!jdText) {
      setJdText(defaultJd);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Greeting Header */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
          TUESDAY, 14 JANUARY 2025
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Good morning, Sarah.</h1>
        <p className="text-muted-foreground text-[15px]">You have 3 active jobs and 47 unreviewed candidates.</p>
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
            </div>
            <textarea 
              className="w-full bg-transparent border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground min-h-[180px] resize-y"
              placeholder="Paste the full job description here — title, responsibilities, required skills, experience level..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
            
            {parsed && (
              <div className="mt-6 pt-6 border-t border-border animate-in fade-in slide-in-from-top-2">
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                  EXTRACTED REQUIREMENTS
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full px-3 py-1 text-[13px] font-medium">React</span>
                  <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full px-3 py-1 text-[13px] font-medium">TypeScript</span>
                  <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full px-3 py-1 text-[13px] font-medium">Tailwind CSS</span>
                  <span className="bg-sky-500/10 text-sky-500 border border-sky-500/20 rounded-full px-3 py-1 text-[13px] font-medium">Node.js (Nice to have)</span>
                </div>
                <p className="text-[13px] text-muted-foreground">5+ years of experience required</p>
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
              accept=".pdf" 
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
                if (e.dataTransfer.files.length) {
                  setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
                }
              }}
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              <UploadCloud className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-base font-medium text-foreground mb-1">{dragging ? "Release to upload" : "Drop resumes here"}</h4>
              <p className="text-[13px] text-muted-foreground">or click to browse files</p>
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFiles([
                    new File(["Name: Priya Sharma\nSkill: React, TypeScript, Tailwind\nExperience: 6 years at Stripe"], "priya_sharma.pdf", { type: "application/pdf" }),
                    new File(["Name: Marcus Johnson\nSkill: React, Angular, GraphQL\nExperience: 8 years at Vercel"], "marcus_johnson.pdf", { type: "application/pdf" }),
                    new File(["Name: Elena Rodriguez\nSkill: Full Stack, Node, React\nExperience: 5 years at Airbnb"], "elena_rodriguez.pdf", { type: "application/pdf" })
                  ]);
                }}
                className="mt-3 text-xs text-primary hover:underline block mx-auto"
              >
                Use sample resumes
              </button>
            </div>

            {files.length > 0 && (
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[13px] font-medium text-foreground">{files.length} files selected</h4>
                  <button onClick={() => setFiles([])} className="text-[13px] text-muted-foreground hover:text-foreground">Clear all</button>
                </div>
                <div className="max-h-[160px] overflow-y-auto space-y-1 pr-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted group">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-[13px] text-foreground truncate max-w-[200px]">{f.name}</span>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {f.size ? `${(f.size / 1024 / 1024).toFixed(1)} MB` : "Sample PDF"}
                        </span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); removeFile(i); }} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            disabled={!parsed || files.length === 0}
            onClick={() => navigate("/ranking/process", { state: { jdText, files } })}
            className="w-full h-[52px] rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-primary-hover transition-all disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none disabled:cursor-not-allowed group relative"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate AI Ranking</span>
            <span className="absolute right-4 text-[11px] font-mono text-primary-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity">⌘ ↵</span>
          </button>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-6 self-start">
          {/* KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <KPICard label="Candidates processed" value="2,847" trend="+124 this week" trendUp icon={Users2} color="primary" />
            <KPICard label="Avg. AI score" value="73.4" trend="↑ 5.2 pts" trendUp icon={TrendingUp} color="success" />
            <KPICard label="Active jobs" value="12" trend="3 closing soon" icon={Briefcase} color="info" />
            <KPICard label="Hours saved" value="142h" trend="vs manual screening" trendUp icon={Clock} color="secondary" />
          </div>

          {/* Recent Jobs */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-foreground">Recent jobs</h3>
              <button className="text-[13px] text-primary hover:underline">View all →</button>
            </div>
            
            <div className="space-y-0">
              <JobRow title="Senior Frontend Engineer" meta="34 candidates · Today" score={71} status="active" />
              <JobRow title="ML Engineer — NLP" meta="28 candidates · Yesterday" score={68} status="active" />
              <JobRow title="Product Designer" meta="19 candidates · 3 days ago" score={79} status="review" />
              <JobRow title="DevOps Engineer" meta="42 candidates · 5 days ago" score={65} status="closed" last />
            </div>
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

function JobRow({ title, meta, score, status, last }: any) {
  return (
    <div className={cn("py-3.5 flex items-center justify-between", !last && "border-b border-border")}>
      <div>
        <div className="text-[14px] font-medium text-foreground">{title}</div>
        <div className="text-[13px] text-muted-foreground mt-0.5">{meta}</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className={cn("w-2 h-2 rounded-full", status === 'active' ? "bg-emerald-500 animate-pulse" : status === 'review' ? "bg-amber-500" : "bg-muted-foreground")} />
        </div>
        <div className="w-10 text-right">
          <span className={cn(
            "text-[13px] font-bold font-mono px-2 py-0.5 rounded-full",
            score >= 70 ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
          )}>
            {score}
          </span>
        </div>
      </div>
    </div>
  );
}
