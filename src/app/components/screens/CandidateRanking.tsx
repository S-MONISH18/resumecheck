import { useState } from "react";
import { motion } from "motion/react";
import {
  Search, SlidersHorizontal, ArrowUpDown, AlertTriangle,
  ChevronRight, Users, Star, TrendingUp, Clock, Download
} from "lucide-react";
import { CANDIDATES, scoreColor, recConfig, type Candidate } from "../../data/candidates";

const KPI_CARDS = [
  { label: "Total Candidates", value: "5", icon: Users, color: "#2563EB" },
  { label: "Highly Recommended", value: "1", icon: Star, color: "#10B981" },
  { label: "Avg AI Score", value: "71.8", icon: TrendingUp, color: "#7C3AED" },
  { label: "Avg Notice Period", value: "46d", icon: Clock, color: "#F59E0B" },
];

function ScoreChip({ score }: { score: number }) {
  const color = scoreColor(score);
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded font-mono text-xs font-semibold"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
    >
      {score}
    </span>
  );
}

interface CandidateRankingProps {
  onSelectCandidate: (id: string) => void;
}

export function CandidateRanking({ onSelectCandidate }: CandidateRankingProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Candidate>("overall_rank");
  const [filterRec, setFilterRec] = useState<string>("All");

  const recFilters = ["All", "Highly Recommended", "Recommended", "Consider", "Needs Further Review"];

  const filtered = CANDIDATES
    .filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.role.toLowerCase().includes(search.toLowerCase()) ||
        c.current_company.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filterRec === "All" || c.recommendation === filterRec;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      if (sortKey === "overall_rank") return a.overall_rank - b.overall_rank;
      if (sortKey === "final_score") return b.final_score - a.final_score;
      return 0;
    });

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#020617" }}>
      <div className="max-w-[1440px] mx-auto p-6 space-y-5">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {KPI_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl p-4 border"
                style={{ background: "#0F172A", borderColor: "#334155" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${card.color}18` }}>
                    <Icon size={15} style={{ color: card.color }} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{card.value}</p>
                    <p className="text-xs" style={{ color: "#64748B" }}>{card.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border overflow-hidden"
          style={{ background: "#0F172A", borderColor: "#334155" }}
        >
          {/* Toolbar */}
          <div className="flex items-center gap-3 p-4 border-b flex-wrap" style={{ borderColor: "#334155" }}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border flex-1 min-w-48"
              style={{ background: "#1E293B", borderColor: "#334155" }}>
              <Search size={13} style={{ color: "#64748B" }} />
              <input
                type="text"
                placeholder="Search candidates…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-xs outline-none flex-1 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              {recFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterRec(f)}
                  className="text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium"
                  style={{
                    background: filterRec === f ? "rgba(37,99,235,0.2)" : "transparent",
                    color: filterRec === f ? "#60A5FA" : "#64748B",
                    border: `1px solid ${filterRec === f ? "rgba(37,99,235,0.4)" : "transparent"}`,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setSortKey(sortKey === "overall_rank" ? "final_score" : "overall_rank")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors"
                style={{ background: "#1E293B", borderColor: "#334155", color: "#94A3B8" }}
              >
                <ArrowUpDown size={12} />
                {sortKey === "overall_rank" ? "By Rank" : "By Score"}
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium"
                style={{ background: "#1E293B", borderColor: "#334155", color: "#94A3B8" }}
              >
                <Download size={12} />
                Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #1E293B" }}>
                  {["Rank", "Candidate", "Score", "Semantic Fit", "Career", "Leadership", "Readiness", "Avail.", "Recommendation", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider"
                      style={{ color: "#475569" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  const rc = recConfig[c.recommendation];
                  const hasPenalty = c.score_breakdown.profile_integrity_penalty < 0;
                  return (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => onSelectCandidate(c.id)}
                      className="border-b cursor-pointer transition-colors hover:bg-slate-800/40 group"
                      style={{ borderColor: "#1E293B" }}
                    >
                      <td className="px-4 py-3.5">
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            background: c.overall_rank === 1 ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.05)",
                            color: c.overall_rank === 1 ? "#F59E0B" : "#64748B",
                            display: "inline-flex",
                          }}
                        >
                          {c.overall_rank}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                            style={{
                              background: "linear-gradient(135deg, rgba(37,99,235,0.3), rgba(124,58,237,0.3))",
                              color: "#A5B4FC",
                            }}
                          >
                            {c.initials}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-medium text-white">{c.name}</p>
                              {hasPenalty && <AlertTriangle size={11} style={{ color: "#F97316" }} />}
                            </div>
                            <p className="text-xs" style={{ color: "#64748B" }}>{c.current_company} · {c.years_exp}y</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${c.final_score}%`, background: scoreColor(c.final_score) }}
                            />
                          </div>
                          <ScoreChip score={c.final_score} />
                        </div>
                      </td>
                      <td className="px-4 py-3.5"><ScoreChip score={c.score_breakdown.semantic_fit} /></td>
                      <td className="px-4 py-3.5"><ScoreChip score={c.score_breakdown.career_growth} /></td>
                      <td className="px-4 py-3.5"><ScoreChip score={c.score_breakdown.leadership} /></td>
                      <td className="px-4 py-3.5"><ScoreChip score={c.score_breakdown.hiring_readiness} /></td>
                      <td className="px-4 py-3.5"><ScoreChip score={c.score_breakdown.availability} /></td>
                      <td className="px-4 py-3.5">
                        <span
                          className="text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap"
                          style={{ background: rc.bg, color: rc.text, border: `1px solid ${rc.border}` }}
                        >
                          {c.recommendation}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: "#64748B" }} />
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 flex items-center justify-between border-t" style={{ borderColor: "#334155" }}>
            <p className="text-xs" style={{ color: "#475569" }}>Showing {filtered.length} of {CANDIDATES.length} candidates</p>
            <div className="flex items-center gap-1">
              {[1].map((p) => (
                <button key={p}
                  className="w-7 h-7 rounded flex items-center justify-center text-xs font-medium"
                  style={{ background: "rgba(37,99,235,0.2)", color: "#60A5FA" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
