import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, XCircle, Minus, AlertTriangle } from "lucide-react";
import { CANDIDATES, scoreColor, recConfig } from "../../data/candidates";

const COMPARE_DIMENSIONS = [
  { key: "semantic_fit" as const, label: "Semantic Fit", weight: "35%" },
  { key: "career_growth" as const, label: "Career Growth", weight: "20%" },
  { key: "leadership" as const, label: "Leadership", weight: "15%" },
  { key: "hiring_readiness" as const, label: "Hiring Readiness", weight: "15%" },
  { key: "availability" as const, label: "Availability", weight: "10%" },
  { key: "project_relevance" as const, label: "Projects", weight: "5%" },
];

function CompareBar({ value, max }: { value: number; max: number }) {
  const color = scoreColor(value);
  const pct = (value / 100) * 100;
  const isHighest = value === max;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: color,
            boxShadow: isHighest ? `0 0 8px ${color}60` : "none",
          }}
        />
      </div>
      <span
        className="text-xs font-mono font-semibold w-6 text-right"
        style={{ color: isHighest ? color : "#64748B" }}
      >
        {value}
      </span>
      {isHighest && <CheckCircle2 size={11} style={{ color }} />}
    </div>
  );
}

export function CandidateComparison() {
  const [selected, setSelected] = useState<string[]>(["c001", "c002", "c003"]);

  const candidates = CANDIDATES.filter((c) => selected.includes(c.id));

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      if (selected.length > 2) setSelected(selected.filter((x) => x !== id));
    } else {
      if (selected.length < 3) setSelected([...selected, id]);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#020617" }}>
      <div className="max-w-[1440px] mx-auto p-6 space-y-5">

        {/* Candidate selector */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border p-4"
          style={{ background: "#0F172A", borderColor: "#334155" }}
        >
          <p className="text-xs font-medium mb-3" style={{ color: "#64748B" }}>
            Select 2–3 candidates to compare
          </p>
          <div className="flex flex-wrap gap-2">
            {CANDIDATES.map((c) => {
              const isOn = selected.includes(c.id);
              const rc = recConfig[c.recommendation];
              return (
                <button
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all"
                  style={{
                    background: isOn ? "rgba(37,99,235,0.12)" : "transparent",
                    borderColor: isOn ? "rgba(37,99,235,0.4)" : "#334155",
                    color: isOn ? "#60A5FA" : "#64748B",
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: isOn ? "rgba(37,99,235,0.2)" : "#1E293B",
                      color: isOn ? "#93C5FD" : "#475569",
                    }}
                  >
                    {c.initials}
                  </div>
                  <span className="font-medium">{c.name.split(" ")[0]}</span>
                  <span className="text-xs font-mono">{c.final_score}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {candidates.length >= 2 && (
          <>
            {/* Header cards */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${candidates.length}, 1fr)` }}>
              {candidates.map((c, i) => {
                const rc = recConfig[c.recommendation];
                const isTop = c.final_score === Math.max(...candidates.map((x) => x.final_score));
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl border p-5 text-center relative"
                    style={{
                      background: "#0F172A",
                      borderColor: isTop ? "rgba(37,99,235,0.4)" : "#334155",
                    }}
                  >
                    {isTop && (
                      <div
                        className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded font-semibold"
                        style={{ background: "rgba(37,99,235,0.15)", color: "#60A5FA" }}
                      >
                        Top Pick
                      </div>
                    )}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold mx-auto mb-3"
                      style={{
                        background: "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(124,58,237,0.25))",
                        color: "#A5B4FC",
                      }}
                    >
                      {c.initials}
                    </div>
                    <h3 className="font-semibold text-white text-sm">{c.name}</h3>
                    <p className="text-xs mt-0.5 mb-2" style={{ color: "#64748B" }}>{c.current_company}</p>
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{ color: scoreColor(c.final_score) }}
                    >
                      {c.final_score}
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: rc.bg, color: rc.text, border: `1px solid ${rc.border}` }}
                    >
                      {c.recommendation}
                    </span>
                    <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-left" style={{ borderColor: "#1E293B" }}>
                      <div>
                        <p className="text-xs" style={{ color: "#475569" }}>Experience</p>
                        <p className="text-sm font-medium text-white">{c.years_exp}y</p>
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: "#475569" }}>Notice</p>
                        <p className="text-sm font-medium text-white">{c.notice_period}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Dimension comparison */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border overflow-hidden"
              style={{ background: "#0F172A", borderColor: "#334155" }}
            >
              <div className="px-5 py-3 border-b" style={{ borderColor: "#334155" }}>
                <h3 className="text-sm font-semibold text-white">Score Comparison</h3>
              </div>
              <div className="divide-y" style={{ borderColor: "#1E293B" }}>
                {COMPARE_DIMENSIONS.map((dim) => {
                  const scores = candidates.map((c) => c.score_breakdown[dim.key]);
                  const maxScore = Math.max(...scores);
                  return (
                    <div key={dim.key} className="grid px-5 py-3.5 gap-4 items-center"
                      style={{ gridTemplateColumns: `140px repeat(${candidates.length}, 1fr)` }}>
                      <div>
                        <p className="text-sm font-medium text-white">{dim.label}</p>
                        <p className="text-xs" style={{ color: "#475569" }}>Weight: {dim.weight}</p>
                      </div>
                      {candidates.map((c) => (
                        <CompareBar
                          key={c.id}
                          value={c.score_breakdown[dim.key]}
                          max={maxScore}
                        />
                      ))}
                    </div>
                  );
                })}
                {/* Overall row */}
                <div className="grid px-5 py-4 gap-4 items-center"
                  style={{ gridTemplateColumns: `140px repeat(${candidates.length}, 1fr)`, background: "rgba(37,99,235,0.05)" }}>
                  <div>
                    <p className="text-sm font-bold text-white">Final Score</p>
                    <p className="text-xs" style={{ color: "#475569" }}>Weighted total</p>
                  </div>
                  {candidates.map((c) => {
                    const maxFinal = Math.max(...candidates.map((x) => x.final_score));
                    return (
                      <CompareBar key={c.id} value={c.final_score} max={maxFinal} />
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Skills comparison */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${candidates.length}, 1fr)` }}>
              {candidates.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="rounded-xl border p-4"
                  style={{ background: "#0F172A", borderColor: "#334155" }}
                >
                  <h4 className="text-xs font-semibold mb-3 text-white">{c.name.split(" ")[0]}'s Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {c.skills.slice(0, 8).map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded"
                        style={{ background: "rgba(37,99,235,0.1)", color: "#60A5FA", border: "1px solid rgba(37,99,235,0.2)" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  {c.missing_skills.length > 0 && (
                    <div className="mt-2.5">
                      <p className="text-xs mb-1.5" style={{ color: "#475569" }}>Missing</p>
                      <div className="flex flex-wrap gap-1">
                        {c.missing_skills.map((s) => (
                          <span key={s} className="text-xs px-1.5 py-0.5 rounded"
                            style={{ background: "rgba(239,68,68,0.08)", color: "#FCA5A5", border: "1px solid rgba(239,68,68,0.15)" }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
