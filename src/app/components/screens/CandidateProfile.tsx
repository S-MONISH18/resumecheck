import { motion } from "motion/react";
import {
  ArrowLeft, MapPin, Clock, Building2, GraduationCap,
  Award, CheckCircle2, XCircle, Minus, AlertTriangle,
  Shield, Info, Star, TrendingUp, Zap
} from "lucide-react";
import { CANDIDATES, scoreColor, recConfig } from "../../data/candidates";

function GaugeChart({ score }: { score: number }) {
  const color = scoreColor(score);
  const angle = -135 + (score / 100) * 270;
  return (
    <div className="relative w-36 h-24 mx-auto">
      <svg viewBox="0 0 140 90" className="w-full h-full">
        <path d="M 20 80 A 50 50 0 1 1 120 80" fill="none" stroke="#1E293B" strokeWidth="10" strokeLinecap="round" />
        <path
          d="M 20 80 A 50 50 0 1 1 120 80"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 157} 157`}
          style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
        />
        <text x="70" y="75" textAnchor="middle" fontSize="20" fontWeight="700" fill="white" fontFamily="'Inter', sans-serif">
          {score}
        </text>
        <text x="70" y="86" textAnchor="middle" fontSize="7" fill="#64748B" fontFamily="'Inter', sans-serif">
          OVERALL SCORE
        </text>
      </svg>
      <div
        className="absolute bottom-4 left-1/2 w-3 h-3 rounded-full -translate-x-1/2"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
    </div>
  );
}

function RadarChart({ data }: { data: { label: string; value: number }[] }) {
  const cx = 100, cy = 100, r = 72;
  const n = data.length;
  const angleStep = (2 * Math.PI) / n;
  const toXY = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos(angle - Math.PI / 2),
    y: cy + radius * Math.sin(angle - Math.PI / 2),
  });
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = data.map((d, i) => {
    const p = toXY(i * angleStep, (d.value / 100) * r);
    return `${p.x},${p.y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto">
      {gridLevels.map((level, gi) => (
        <polygon
          key={`grid-${gi}`}
          points={data.map((_, i) => {
            const p = toXY(i * angleStep, r * level);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="#334155"
          strokeWidth="0.8"
        />
      ))}
      {data.map((_, i) => {
        const p = toXY(i * angleStep, r);
        return <line key={`axis-${i}`} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#334155" strokeWidth="0.8" />;
      })}
      <polygon points={dataPoints} fill="rgba(37,99,235,0.2)" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round" />
      {data.map((d, i) => {
        const p = toXY(i * angleStep, (d.value / 100) * r);
        return <circle key={`dot-${i}`} cx={p.x} cy={p.y} r={2.5} fill="#2563EB" />;
      })}
      {data.map((d, i) => {
        const labelR = r + 16;
        const p = toXY(i * angleStep, labelR);
        const anchor = p.x < cx - 3 ? "end" : p.x > cx + 3 ? "start" : "middle";
        return (
          <g key={`label-${i}`}>
            <text x={p.x} y={p.y + 3} textAnchor={anchor} fontSize="8.5" fill="#94A3B8" fontFamily="'Inter', sans-serif">{d.label}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const p = toXY(i * angleStep, (d.value / 100) * r);
        return (
          <text key={`val-${i}`} x={p.x} y={p.y - 5} textAnchor="middle" fontSize="7.5" fill={scoreColor(d.value)} fontFamily="'Inter', sans-serif" fontWeight="600">{d.value}</text>
        );
      })}
    </svg>
  );
}

function ScoreBar({ label, value, weight }: { label: string; value: number; weight: string }) {
  const color = scoreColor(value);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: "#CBD5E1" }}>{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: "#475569" }}>{weight}</span>
          <span className="text-xs font-mono font-semibold" style={{ color }}>{value}</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

interface CandidateProfileProps {
  candidateId: string;
  onBack: () => void;
}

export function CandidateProfile({ candidateId, onBack }: CandidateProfileProps) {
  const c = CANDIDATES.find((x) => x.id === candidateId) ?? CANDIDATES[0];
  const rc = recConfig[c.recommendation];

  const radarData = [
    { label: "Semantic", value: c.score_breakdown.semantic_fit },
    { label: "Career", value: c.score_breakdown.career_growth },
    { label: "Leadership", value: c.score_breakdown.leadership },
    { label: "Readiness", value: c.score_breakdown.hiring_readiness },
    { label: "Availability", value: c.score_breakdown.availability },
    { label: "Projects", value: c.score_breakdown.project_relevance },
  ];

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#020617" }}>
      <div className="max-w-[1440px] mx-auto p-6">

        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm mb-5 transition-colors hover:text-white"
          style={{ color: "#64748B" }}
        >
          <ArrowLeft size={15} />
          Back to Rankings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* LEFT PANEL (2/5) */}
          <div className="lg:col-span-2 space-y-4">

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border p-5"
              style={{ background: "#0F172A", borderColor: "#334155" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.3), rgba(124,58,237,0.3))", color: "#A5B4FC" }}
                >
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-white">{c.name}</h2>
                    {c.score_breakdown.profile_integrity_penalty < 0 && (
                      <AlertTriangle size={13} style={{ color: "#F97316" }} />
                    )}
                  </div>
                  <p className="text-sm" style={{ color: "#94A3B8" }}>{c.role}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#64748B" }}>
                      <Building2 size={11} />{c.current_company}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#64748B" }}>
                      <MapPin size={11} />{c.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#64748B" }}>
                      <Clock size={11} />{c.notice_period}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t" style={{ borderColor: "#1E293B" }}>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: rc.bg, color: rc.text, border: `1px solid ${rc.border}` }}
                >
                  #{c.overall_rank} · {c.recommendation}
                </span>
              </div>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border p-5"
              style={{ background: "#0F172A", borderColor: "#334155" }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#475569" }}>
                Experience
              </h3>
              <div className="space-y-4">
                {c.experience.map((exp, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ background: i === 0 ? "#2563EB" : "#334155" }} />
                      {i < c.experience.length - 1 && (
                        <div className="w-0.5 flex-1 mt-1" style={{ background: "#1E293B" }} />
                      )}
                    </div>
                    <div className="pb-4 flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{exp.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{exp.company} · {exp.period}</p>
                      <ul className="mt-1.5 space-y-0.5">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex gap-1.5 text-xs" style={{ color: "#94A3B8" }}>
                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "#334155" }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border p-5"
              style={{ background: "#0F172A", borderColor: "#334155" }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#475569" }}>Education</h3>
              {c.education.map((edu, i) => (
                <div key={i} className="flex items-center gap-3">
                  <GraduationCap size={15} style={{ color: "#7C3AED" }} />
                  <div>
                    <p className="text-sm font-medium text-white">{edu.degree}</p>
                    <p className="text-xs" style={{ color: "#64748B" }}>{edu.school} · {edu.year}</p>
                  </div>
                </div>
              ))}
              <div className="mt-3 pt-3 border-t space-y-1.5" style={{ borderColor: "#1E293B" }}>
                <h4 className="text-xs font-medium uppercase tracking-wider" style={{ color: "#475569" }}>Certifications</h4>
                {c.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "#94A3B8" }}>
                    <Award size={11} style={{ color: "#F59E0B" }} />
                    {cert}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border p-5"
              style={{ background: "#0F172A", borderColor: "#334155" }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#475569" }}>Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {c.skills.map((skill) => (
                  <span key={skill} className="text-xs px-2 py-0.5 rounded font-medium"
                    style={{ background: "rgba(37,99,235,0.1)", color: "#60A5FA", border: "1px solid rgba(37,99,235,0.2)" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT PANEL (3/5) */}
          <div className="lg:col-span-3 space-y-4">

            {/* Score Gauge + Radar */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border p-5 flex flex-col items-center justify-center"
                style={{ background: "#0F172A", borderColor: "#334155" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#475569" }}>AI Score Gauge</p>
                <GaugeChart score={c.final_score} />
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
                    <div className="h-full rounded-full" style={{ width: `${c.confidence}%`, background: "linear-gradient(90deg, #2563EB, #7C3AED)" }} />
                  </div>
                  <span className="text-xs font-mono" style={{ color: "#64748B" }}>Conf. {c.confidence}%</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-xl border p-5"
                style={{ background: "#0F172A", borderColor: "#334155" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#475569" }}>Competency Radar</p>
                <RadarChart data={radarData} />
              </motion.div>
            </div>

            {/* Score Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border p-5"
              style={{ background: "#0F172A", borderColor: "#334155" }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#475569" }}>Score Breakdown</h3>
              <div className="space-y-3">
                <ScoreBar label="Semantic Fit" value={c.score_breakdown.semantic_fit} weight="35%" />
                <ScoreBar label="Career Growth" value={c.score_breakdown.career_growth} weight="20%" />
                <ScoreBar label="Leadership" value={c.score_breakdown.leadership} weight="15%" />
                <ScoreBar label="Hiring Readiness" value={c.score_breakdown.hiring_readiness} weight="15%" />
                <ScoreBar label="Availability" value={c.score_breakdown.availability} weight="10%" />
                <ScoreBar label="Project Relevance" value={c.score_breakdown.project_relevance} weight="5%" />
              </div>
              {c.score_breakdown.profile_integrity_penalty < 0 && (
                <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <Shield size={12} style={{ color: "#EF4444" }} />
                  <span className="text-xs" style={{ color: "#EF4444" }}>
                    Integrity penalty: {c.score_breakdown.profile_integrity_penalty} pts
                  </span>
                </div>
              )}
            </motion.div>

            {/* Strengths / Weaknesses / Missing */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: "Strengths", items: c.strengths, icon: CheckCircle2, color: "#10B981", dot: "#10B981" },
                { title: "Weaknesses", items: c.weaknesses, icon: Minus, color: "#F97316", dot: "#F97316" },
                { title: "Missing Skills", items: c.missing_skills, icon: XCircle, color: "#64748B", dot: "#334155" },
              ].map((section) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="rounded-xl border p-4"
                    style={{ background: "#0F172A", borderColor: "#334155" }}
                  >
                    <h3 className="flex items-center gap-1.5 text-xs font-semibold mb-3"
                      style={{ color: section.color }}>
                      <Icon size={12} />
                      {section.title}
                    </h3>
                    {section.title === "Missing Skills" ? (
                      <div className="flex flex-wrap gap-1">
                        {section.items.map((item, i) => (
                          <span key={i} className="text-xs px-1.5 py-0.5 rounded"
                            style={{ background: "rgba(239,68,68,0.08)", color: "#FCA5A5", border: "1px solid rgba(239,68,68,0.15)" }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-1.5">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex gap-1.5 text-xs leading-snug" style={{ color: "#94A3B8" }}>
                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: section.dot }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Executive Summary */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border p-5"
              style={{ background: "#0F172A", borderColor: "#334155" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Star size={14} style={{ color: "#F59E0B" }} />
                <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>AI Executive Summary</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#CBD5E1" }}>{c.executive_summary}</p>
            </motion.div>

            {/* Reasoning */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-xl border p-5"
              style={{ background: "#0F172A", borderColor: "#334155" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Info size={14} style={{ color: "#38BDF8" }} />
                <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Reasoning Chain</h3>
              </div>
              <div className="space-y-2.5">
                {c.reasoning.map((reason, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span
                      className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-bold mt-0.5"
                      style={{ background: "rgba(37,99,235,0.15)", color: "#60A5FA" }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{reason}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fairness note */}
            <div className="flex items-start gap-2 px-4 py-3 rounded-xl border"
              style={{ background: "rgba(37,99,235,0.04)", borderColor: "rgba(37,99,235,0.15)" }}>
              <Shield size={12} className="mt-0.5 shrink-0" style={{ color: "#475569" }} />
              <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>
                Scoring excludes name, gender, age, ethnicity, religion, marital status, and address. Only job-relevant qualifications from observable profile evidence are used.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
