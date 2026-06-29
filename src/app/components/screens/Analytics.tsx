import { motion } from "motion/react";
import { TrendingUp, Users, AlertTriangle, Target, Award } from "lucide-react";
import { CANDIDATES, scoreColor } from "../../data/candidates";

const SCORE_DIST = [
  { range: "0–20", count: 0 },
  { range: "21–40", count: 0 },
  { range: "41–60", count: 1 },
  { range: "61–70", count: 1 },
  { range: "71–80", count: 1 },
  { range: "81–90", count: 1 },
  { range: "91–100", count: 1 },
];

const SKILL_GAP = [
  { skill: "LLM Fine-tuning", gap: 60 },
  { skill: "MLOps / MLflow", gap: 80 },
  { skill: "Vector DBs", gap: 70 },
  { skill: "Distributed Training", gap: 55 },
  { skill: "K8s at Scale", gap: 65 },
];

const HIRING_FUNNEL = [
  { name: "Applied", value: 24, color: "#2563EB" },
  { name: "Screened", value: 12, color: "#7C3AED" },
  { name: "AI Ranked", value: 5, color: "#38BDF8" },
  { name: "Recommended", value: 3, color: "#10B981" },
  { name: "Interview Ready", value: 2, color: "#F59E0B" },
];

const REC_PIE = [
  { name: "Highly Rec.", value: 1, color: "#10B981" },
  { name: "Recommended", value: 1, color: "#38BDF8" },
  { name: "Consider", value: 1, color: "#F59E0B" },
  { name: "Review", value: 1, color: "#F97316" },
  { name: "Not Rec.", value: 1, color: "#EF4444" },
];

const METRICS = [
  { label: "Candidates Processed", value: "5", sub: "Senior ML Engineer", icon: Users, color: "#2563EB" },
  { label: "Avg AI Score", value: "71.8", sub: "+12% vs last batch", icon: TrendingUp, color: "#10B981" },
  { label: "Integrity Flags", value: "2", sub: "Minor issues", icon: AlertTriangle, color: "#F97316" },
  { label: "Skill Coverage", value: "68%", sub: "vs job requirements", icon: Target, color: "#7C3AED" },
  { label: "Avg Confidence", value: "78.6%", sub: "Explainability score", icon: Award, color: "#38BDF8" },
];

// ── Custom SVG bar chart ──────────────────────────────────────────────────────
function BarChartSVG({ data }: { data: { range: string; count: number }[] }) {
  const W = 420, H = 160, PAD = { top: 10, right: 10, bottom: 28, left: 28 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const maxVal = Math.max(...data.map((d) => d.count), 1);
  const barW = innerW / data.length;
  const barPad = barW * 0.25;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      {/* Y axis ticks */}
      {[0, 1, 2].map((v) => {
        const y = PAD.top + innerH - (v / maxVal) * innerH;
        return (
          <g key={`ytick-${v}`}>
            <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#1E293B" strokeWidth="1" />
            <text x={PAD.left - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#475569" fontFamily="'Inter', sans-serif">{v}</text>
          </g>
        );
      })}
      {/* Bars */}
      {data.map((d, i) => {
        const x = PAD.left + i * barW + barPad;
        const bw = barW - barPad * 2;
        const bh = (d.count / maxVal) * innerH;
        const y = PAD.top + innerH - bh;
        return (
          <g key={`bar-${i}`}>
            <rect x={x} y={PAD.top + innerH} width={bw} height={0} fill={d.count > 0 ? "#2563EB" : "#1E293B"} rx="3" ry="3">
              <animate attributeName="height" from="0" to={bh || 0} dur="0.6s" fill="freeze" />
              <animate attributeName="y" from={PAD.top + innerH} to={y} dur="0.6s" fill="freeze" />
            </rect>
            <text x={x + bw / 2} y={H - PAD.bottom + 12} textAnchor="middle" fontSize="9" fill="#475569" fontFamily="'Inter', sans-serif">
              {d.range}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Custom SVG donut chart ────────────────────────────────────────────────────
function DonutChartSVG({ data }: { data: { name: string; value: number; color: string }[] }) {
  const cx = 70, cy = 70, R = 52, r = 34;
  const total = data.reduce((s, d) => s + d.value, 0);
  let startAngle = -Math.PI / 2;
  const slices = data.map((d) => {
    const sweep = (d.value / total) * 2 * Math.PI;
    const x1 = cx + R * Math.cos(startAngle);
    const y1 = cy + R * Math.sin(startAngle);
    const x2 = cx + R * Math.cos(startAngle + sweep);
    const y2 = cy + R * Math.sin(startAngle + sweep);
    const ix1 = cx + r * Math.cos(startAngle);
    const iy1 = cy + r * Math.sin(startAngle);
    const ix2 = cx + r * Math.cos(startAngle + sweep);
    const iy2 = cy + r * Math.sin(startAngle + sweep);
    const large = sweep > Math.PI ? 1 : 0;
    const path = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${r} ${r} 0 ${large} 0 ${ix1} ${iy1} Z`;
    startAngle += sweep;
    return { ...d, path };
  });

  return (
    <svg viewBox="0 0 140 140" className="w-full" style={{ maxHeight: 140 }}>
      {slices.map((s, i) => (
        <path key={`slice-${i}`} d={s.path} fill={s.color} opacity={0.9} />
      ))}
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fontFamily="'Inter', sans-serif">{total}</text>
    </svg>
  );
}

// ── Custom grouped bar chart ──────────────────────────────────────────────────
function GroupedBarSVG({ data }: { data: { name: string; Semantic: number; Career: number; Leadership: number; Readiness: number }[] }) {
  const W = 560, H = 180, PAD = { top: 10, right: 10, bottom: 28, left: 36 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const keys = ["Semantic", "Career", "Leadership", "Readiness"] as const;
  const colors = { Semantic: "#2563EB", Career: "#7C3AED", Leadership: "#38BDF8", Readiness: "#10B981" };
  const groupW = innerW / data.length;
  const barW = (groupW * 0.75) / keys.length;
  const groupPad = groupW * 0.125;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
      {[0, 25, 50, 75, 100].map((v) => {
        const y = PAD.top + innerH - (v / 100) * innerH;
        return (
          <g key={`yg-${v}`}>
            <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#1E293B" strokeWidth="1" />
            <text x={PAD.left - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#475569" fontFamily="'Inter', sans-serif">{v}</text>
          </g>
        );
      })}
      {data.map((d, gi) => {
        const gx = PAD.left + gi * groupW + groupPad;
        return (
          <g key={`group-${gi}`}>
            {keys.map((k, ki) => {
              const val = d[k];
              const bh = (val / 100) * innerH;
              const x = gx + ki * barW;
              const y = PAD.top + innerH - bh;
              return (
                <rect key={`gb-${gi}-${ki}`} x={x} y={y} width={barW - 1} height={bh} fill={colors[k]} rx="2" opacity="0.85" />
              );
            })}
            <text x={gx + (groupW * 0.75) / 2} y={H - PAD.bottom + 12} textAnchor="middle" fontSize="10" fill="#475569" fontFamily="'Inter', sans-serif">
              {d.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Analytics() {
  const groupedData = CANDIDATES.map((c) => ({
    name: c.name.split(" ")[0],
    Semantic: c.score_breakdown.semantic_fit,
    Career: c.score_breakdown.career_growth,
    Leadership: c.score_breakdown.leadership,
    Readiness: c.score_breakdown.hiring_readiness,
  }));

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#020617" }}>
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">

        {/* Top metrics */}
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border p-4"
                style={{ background: "#0F172A", borderColor: "#334155" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} style={{ color: m.color }} />
                  <span className="text-xs" style={{ color: "#64748B" }}>{m.label}</span>
                </div>
                <p className="text-2xl font-bold text-white">{m.value}</p>
                <p className="text-xs mt-0.5" style={{ color: "#475569" }}>{m.sub}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Score Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 rounded-xl border p-5"
            style={{ background: "#0F172A", borderColor: "#334155" }}
          >
            <h3 className="text-sm font-semibold text-white mb-4">Score Distribution</h3>
            <BarChartSVG data={SCORE_DIST} />
          </motion.div>

          {/* Recommendation Donut */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-xl border p-5"
            style={{ background: "#0F172A", borderColor: "#334155" }}
          >
            <h3 className="text-sm font-semibold text-white mb-3">Recommendation Mix</h3>
            <DonutChartSVG data={REC_PIE} />
            <div className="space-y-1.5 mt-2">
              {REC_PIE.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs" style={{ color: "#94A3B8" }}>{item.name}</span>
                  </div>
                  <span className="text-xs font-mono" style={{ color: "#64748B" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Skill Gap */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border p-5"
            style={{ background: "#0F172A", borderColor: "#334155" }}
          >
            <h3 className="text-sm font-semibold text-white mb-4">Top Missing Skills</h3>
            <div className="space-y-3">
              {SKILL_GAP.map((item) => (
                <div key={item.skill}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#CBD5E1" }}>{item.skill}</span>
                    <span className="font-mono" style={{ color: "#EF4444" }}>{item.gap}% gap</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.gap}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #EF4444, #F97316)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hiring Funnel */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="rounded-xl border p-5"
            style={{ background: "#0F172A", borderColor: "#334155" }}
          >
            <h3 className="text-sm font-semibold text-white mb-4">Hiring Funnel</h3>
            <div className="space-y-2">
              {HIRING_FUNNEL.map((stage, i) => {
                const pct = (stage.value / HIRING_FUNNEL[0].value) * 100;
                return (
                  <div key={stage.name} className="flex items-center gap-3">
                    <span className="w-28 text-xs shrink-0" style={{ color: "#94A3B8" }}>{stage.name}</span>
                    <div className="flex-1 h-6 rounded-lg overflow-hidden" style={{ background: "#1E293B" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-lg flex items-center pl-2"
                        style={{ background: stage.color, opacity: 0.85 }}
                      >
                        <span className="text-xs font-medium text-white">{stage.value}</span>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Candidate Score Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border p-5"
          style={{ background: "#0F172A", borderColor: "#334155" }}
        >
          <h3 className="text-sm font-semibold text-white mb-4">Candidate Score Comparison</h3>
          <GroupedBarSVG data={groupedData} />
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            {[
              { label: "Semantic", color: "#2563EB" },
              { label: "Career", color: "#7C3AED" },
              { label: "Leadership", color: "#38BDF8" },
              { label: "Readiness", color: "#10B981" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: item.color }} />
                <span className="text-xs" style={{ color: "#64748B" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
