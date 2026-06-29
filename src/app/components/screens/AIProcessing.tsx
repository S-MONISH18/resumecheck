import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain, Zap, FileText, GitMerge, TrendingUp,
  CheckCircle, Shield, Lightbulb, BarChart3, Sparkles
} from "lucide-react";

const STAGES = [
  { id: 1, name: "Understanding Job Description", detail: "Parsing role, skills, experience requirements, and responsibilities", icon: Brain, duration: 400 },
  { id: 2, name: "Extracting Skills", detail: "Building required/preferred skill taxonomy from JD", icon: Zap, duration: 350 },
  { id: 3, name: "Analyzing Resumes", detail: "Extracting structured data from 5 candidate profiles", icon: FileText, duration: 500 },
  { id: 4, name: "Semantic Matching", detail: "Contextual similarity between JD requirements and candidates", icon: GitMerge, duration: 600 },
  { id: 5, name: "Career Intelligence", detail: "Evaluating growth trajectory, promotions, domain consistency", icon: TrendingUp, duration: 450 },
  { id: 6, name: "Hiring Readiness", detail: "Skill freshness, certifications, recent activity signals", icon: CheckCircle, duration: 400 },
  { id: 7, name: "Profile Integrity", detail: "Detecting keyword stuffing, timeline inconsistencies, duplicates", icon: Shield, duration: 380 },
  { id: 8, name: "Generating Explainability", detail: "Building recruiter-friendly reasoning chains per candidate", icon: Lightbulb, duration: 520 },
  { id: 9, name: "Ranking Candidates", detail: "Applying weighted formula and normalizing final scores", icon: BarChart3, duration: 300 },
];

interface AIProcessingProps {
  onComplete: () => void;
}

export function AIProcessing({ onComplete }: AIProcessingProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    let stageIdx = 0;
    let total = 0;
    STAGES.forEach((s, i) => {
      setTimeout(() => {
        setCurrentStage(i);
      }, total);
      total += s.duration;
      setTimeout(() => {
        setCompletedStages((prev) => [...prev, i]);
      }, total);
      total += 80;
    });
    setTimeout(() => {
      setDone(true);
      setParticles(Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: 40 + Math.random() * 20,
        y: 40 + Math.random() * 20,
      })));
    }, total + 200);
  }, []);

  const progress = completedStages.length / STAGES.length;

  return (
    <div
      className="flex-1 flex items-center justify-center p-6"
      style={{ background: "#020617" }}
    >
      <div className="w-full max-w-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))", border: "1px solid rgba(99,102,241,0.3)" }}
          >
            <motion.div
              animate={done ? { rotate: 0 } : { rotate: 360 }}
              transition={done ? {} : { duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={24} style={{ color: "#60A5FA" }} />
            </motion.div>
          </div>
          <h2 className="text-xl font-bold text-white">
            {done ? "Analysis Complete" : "Running AI Pipeline"}
          </h2>
          <p className="text-sm mt-1" style={{ color: "#64748B" }}>
            {done ? "5 candidates ranked and ready for review" : "Processing 5 candidates against Senior ML Engineer role"}
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1.5" style={{ color: "#64748B" }}>
            <span>Pipeline Progress</span>
            <span className="font-mono" style={{ color: "#60A5FA" }}>{Math.round(progress * 100)}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ background: "linear-gradient(90deg, #2563EB, #7C3AED)" }}
            />
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-2">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            const isActive = currentStage === i && !completedStages.includes(i);
            const isComplete = completedStages.includes(i);
            const isPending = !isActive && !isComplete;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all"
                style={{
                  background: isActive
                    ? "rgba(37,99,235,0.1)"
                    : isComplete
                    ? "rgba(16,185,129,0.05)"
                    : "transparent",
                  border: `1px solid ${isActive ? "rgba(37,99,235,0.3)" : isComplete ? "rgba(16,185,129,0.15)" : "transparent"}`,
                }}
              >
                {/* Stage icon */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: isComplete
                      ? "rgba(16,185,129,0.15)"
                      : isActive
                      ? "rgba(37,99,235,0.2)"
                      : "rgba(255,255,255,0.04)",
                  }}
                >
                  {isComplete ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
                      <CheckCircle size={14} style={{ color: "#10B981" }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={isActive ? { opacity: [1, 0.5, 1] } : {}}
                      transition={isActive ? { duration: 1.2, repeat: Infinity } : {}}
                    >
                      <Icon size={14} style={{ color: isActive ? "#60A5FA" : "#334155" }} />
                    </motion.div>
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium"
                    style={{ color: isComplete ? "#CBD5E1" : isActive ? "#F8FAFC" : "#475569" }}
                  >
                    {stage.name}
                  </p>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs mt-0.5 truncate"
                      style={{ color: "#64748B" }}
                    >
                      {stage.detail}
                    </motion.p>
                  )}
                </div>

                {/* Status */}
                <div className="shrink-0">
                  {isActive && (
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="flex gap-0.5"
                    >
                      {[0, 1, 2].map((d) => (
                        <motion.div
                          key={d}
                          className="w-1 h-1 rounded-full"
                          style={{ background: "#2563EB" }}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.2 }}
                        />
                      ))}
                    </motion.div>
                  )}
                  {isComplete && (
                    <span className="text-xs font-mono" style={{ color: "#334155" }}>
                      {stage.id < 10 ? `0${stage.id}` : stage.id}/09
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Complete CTA */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-6"
            >
              <button
                onClick={onComplete}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", boxShadow: "0 4px 20px rgba(37,99,235,0.35)" }}
              >
                <BarChart3 size={16} />
                View Candidate Rankings
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
