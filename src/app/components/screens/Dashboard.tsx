import { useState, useCallback } from "react";
import { motion } from "motion/react";
import {
  Upload, FileText, Briefcase, Users, Star, Clock,
  ArrowRight, Plus, Sparkles, TrendingUp, CheckCircle, ChevronRight
} from "lucide-react";
import { CANDIDATES } from "../../data/candidates";

const STAT_CARDS = [
  { label: "Candidates Processed", value: "1,284", change: "+12%", icon: Users, color: "#2563EB" },
  { label: "Avg Match Score", value: "74.2", change: "+5.1", icon: TrendingUp, color: "#7C3AED" },
  { label: "Highly Recommended", value: "23", change: "+3", icon: Star, color: "#10B981" },
  { label: "Ready to Interview", value: "41", change: "+8", icon: CheckCircle, color: "#38BDF8" },
];

const RECENT_JOBS = [
  { title: "Senior ML Engineer", dept: "AI Platform", candidates: 5, status: "Active", date: "Jun 25, 2026" },
  { title: "Staff Backend Engineer", dept: "Infrastructure", candidates: 12, status: "Active", date: "Jun 20, 2026" },
  { title: "Product Designer", dept: "Design", candidates: 8, status: "Completed", date: "Jun 15, 2026" },
  { title: "Data Scientist", dept: "Analytics", candidates: 19, status: "Active", date: "Jun 10, 2026" },
];

interface DashboardProps {
  onStartProcessing: () => void;
}

export function Dashboard({ onStartProcessing }: DashboardProps) {
  const [jdText, setJdText] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...files].slice(0, 5));
  }, []);

  const handleGenerate = () => {
    if (jdText.trim() || uploadedFiles.length > 0) {
      onStartProcessing();
    }
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#020617" }}>
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-2xl overflow-hidden p-6 md:p-8"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(ellipse at 70% 50%, rgba(37,99,235,0.3) 0%, transparent 60%)",
            }}
          />
          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ background: "rgba(37,99,235,0.3)" }}>
                  <Sparkles size={13} style={{ color: "#60A5FA" }} />
                </div>
                <span className="text-xs font-medium" style={{ color: "#60A5FA" }}>AI-Powered Talent Intelligence</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Beyond Resume Matching.
              </h1>
              <p className="text-lg font-semibold" style={{ color: "#818CF8" }}>
                Predict Hiring Success.
              </p>
              <p className="mt-2 text-sm max-w-lg" style={{ color: "#94A3B8" }}>
                Upload a job description and candidate resumes. TalentGraph AI runs a 9-stage semantic evaluation pipeline to rank candidates by predicted hiring success.
              </p>
            </div>
            <button
              onClick={onStartProcessing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
            >
              <Sparkles size={15} />
              View Rankings
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {STAT_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
                className="rounded-xl p-4 border transition-all hover:border-slate-600"
                style={{ background: "#0F172A", borderColor: "#334155" }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${card.color}18` }}
                  >
                    <Icon size={16} style={{ color: card.color }} />
                  </div>
                  <span className="text-xs font-medium px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>
                    {card.change}
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold text-white">{card.value}</p>
                <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{card.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Job Description */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.35 }}
            className="rounded-xl border p-5"
            style={{ background: "#0F172A", borderColor: "#334155" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <FileText size={16} style={{ color: "#2563EB" }} />
              <h2 className="text-sm font-semibold text-white">Job Description</h2>
              <span className="text-xs px-1.5 py-0.5 rounded ml-auto"
                style={{ background: "rgba(37,99,235,0.12)", color: "#60A5FA" }}>
                Required
              </span>
            </div>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste job description here, or describe the role requirements…&#10;&#10;Example: We're hiring a Senior ML Engineer with 5+ years of experience in LLM fine-tuning, RLHF pipelines, and production model deployment…"
              className="w-full rounded-lg p-3 text-sm resize-none outline-none transition-colors"
              style={{
                background: "#1E293B",
                border: "1px solid #334155",
                color: "#CBD5E1",
                minHeight: 160,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.6,
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(37,99,235,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "#334155")}
            />
            <p className="text-xs mt-2" style={{ color: "#475569" }}>
              {jdText.length > 0 ? `${jdText.split(/\s+/).filter(Boolean).length} words` : "Supports plain text, Markdown, or job board format"}
            </p>
          </motion.div>

          {/* Resume Upload */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.35 }}
            className="rounded-xl border p-5 flex flex-col"
            style={{ background: "#0F172A", borderColor: "#334155" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Upload size={16} style={{ color: "#7C3AED" }} />
              <h2 className="text-sm font-semibold text-white">Upload Resumes</h2>
              <span className="text-xs px-1.5 py-0.5 rounded ml-auto"
                style={{ background: "rgba(124,58,237,0.12)", color: "#A78BFA" }}>
                PDF / DOCX
              </span>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className="flex-1 rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-6 transition-all cursor-pointer"
              style={{
                borderColor: dragOver ? "#7C3AED" : "#334155",
                background: dragOver ? "rgba(124,58,237,0.07)" : "transparent",
                minHeight: 120,
              }}
            >
              <Upload size={22} style={{ color: dragOver ? "#A78BFA" : "#475569" }} />
              <p className="text-sm mt-2 font-medium" style={{ color: dragOver ? "#A78BFA" : "#CBD5E1" }}>
                Drop resumes here
              </p>
              <p className="text-xs mt-1" style={{ color: "#475569" }}>or click to browse</p>
            </div>

            {uploadedFiles.length > 0 ? (
              <div className="mt-3 space-y-1.5">
                {uploadedFiles.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                    style={{ background: "#1E293B" }}>
                    <FileText size={12} style={{ color: "#64748B" }} />
                    <span className="text-xs flex-1 truncate" style={{ color: "#CBD5E1" }}>{f}</span>
                    <CheckCircle size={12} style={{ color: "#10B981" }} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-3 space-y-1.5">
                {CANDIDATES.map((c) => (
                  <div key={c.id} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                    style={{ background: "#1E293B" }}>
                    <FileText size={12} style={{ color: "#64748B" }} />
                    <span className="text-xs flex-1 truncate" style={{ color: "#CBD5E1" }}>
                      {c.name.toLowerCase().replace(" ", "_")}_resume.pdf
                    </span>
                    <CheckCircle size={12} style={{ color: "#10B981" }} />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Generate Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
            boxShadow: "0 4px 24px rgba(37,99,235,0.3)",
          }}
        >
          <Sparkles size={16} />
          Generate AI Ranking
          <ArrowRight size={15} />
        </motion.button>

        {/* Recent Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border"
          style={{ background: "#0F172A", borderColor: "#334155" }}
        >
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "#334155" }}>
            <div className="flex items-center gap-2">
              <Briefcase size={15} style={{ color: "#2563EB" }} />
              <h2 className="text-sm font-semibold text-white">Recent Jobs</h2>
            </div>
            <button className="flex items-center gap-1 text-xs" style={{ color: "#60A5FA" }}>
              <Plus size={12} />
              New Job
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: "#334155" }}>
            {RECENT_JOBS.map((job, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-slate-800/30 transition-colors group cursor-pointer">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(37,99,235,0.12)" }}
                >
                  <Briefcase size={14} style={{ color: "#60A5FA" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{job.title}</p>
                  <p className="text-xs" style={{ color: "#64748B" }}>{job.dept} · {job.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-medium text-white">{job.candidates}</p>
                    <p className="text-xs" style={{ color: "#64748B" }}>candidates</p>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: job.status === "Active" ? "rgba(16,185,129,0.1)" : "rgba(100,116,139,0.15)",
                      color: job.status === "Active" ? "#10B981" : "#64748B",
                    }}
                  >
                    {job.status}
                  </span>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#64748B" }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
