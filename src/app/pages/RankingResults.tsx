import { 
  RefreshCw, Download, Share2, Users2, TrendingUp, Star, CalendarCheck, CheckCircle2, 
  Search, MapPin, Eye, MoreHorizontal, Check, Copy
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router";
import { stateStore } from "../state";

const mapAvailability = (notice: string): 'immediate' | 'within_30d' | 'within_90d' | 'unavailable' => {
  const n = (notice || '').toLowerCase();
  if (n.includes('immediate') || n.includes('active') || n.includes('now')) return 'immediate';
  if (n.includes('30') || n.includes('1 month') || n.includes('30d')) return 'within_30d';
  if (n.includes('60') || n.includes('90') || n.includes('2 month') || n.includes('3 month') || n.includes('90d')) return 'within_90d';
  return 'unavailable';
};

const mapRecommendation = (rec: string): 'highly_recommended' | 'recommended' | 'consider' | 'not_recommended' => {
  const r = (rec || '').toLowerCase();
  if (r.includes('highly') || r.includes('strong')) return 'highly_recommended';
  if (r.includes('not')) return 'not_recommended';
  if (r.includes('consider') || r.includes('review') || r.includes('look')) return 'consider';
  return 'recommended';
};

export function RankingResults() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [shortlisted, setShortlisted] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Overall Score");
  const [copied, setCopied] = useState(false);

  const appState = stateStore.get();
  const candidates = appState.candidates;
  const activeJobTitle = appState.activeJobTitle || "Job Ranking";
  const jobDescription = appState.jobDescription || "";

  // Derive company name from JD or use generic
  const companyLine = jobDescription.match(/(?:at|for|company[:\s]+)([A-Z][a-zA-Z0-9 &.]+?)(?:[\n.,]|$)/)?.[1]?.trim() || "";

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAll = (visibleIds: string[]) => {
    if (selected.length === visibleIds.length) setSelected([]);
    else setSelected(visibleIds);
  };

  const toggleShortlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShortlisted(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /** Export candidates list as CSV */
  const exportCSV = (rows: typeof candidates) => {
    const headers = ["Rank","Name","Role","Company","Score","Skill Match","Experience","Location","Availability","Recommendation"];
    const lines = rows.map((c, i) => [
      i + 1, c.name, c.role || "", c.current_company || "",
      c.final_score, `${c.score_breakdown?.semantic_fit || 0}%`,
      `${c.years_exp} yrs`, c.location || "",
      c.notice_period || "", c.recommendation || ""
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(","));
    const csv = [headers.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${activeJobTitle.replace(/\s+/g,"_")}_ranking.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCompareClick = () => {
    navigate("/compare", { state: { ids: selected } });
  };

  const handleShortlistSelected = () => {
    setShortlisted(prev => {
      const next = new Set(prev);
      selected.forEach(id => next.add(id));
      return next;
    });
    setSelected([]);
  };

  // Filter + Sort
  const filteredCandidates = candidates.filter(c => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.role || "").toLowerCase().includes(q) ||
      (c.current_company || "").toLowerCase().includes(q) ||
      (c.location || "").toLowerCase().includes(q) ||
      (c.skills || []).some(s => s.toLowerCase().includes(q))
    );
  });
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === "Semantic Match") return (b.score_breakdown?.semantic_fit || 0) - (a.score_breakdown?.semantic_fit || 0);
    if (sortBy === "Experience") return (b.years_exp || 0) - (a.years_exp || 0);
    return (b.final_score || 0) - (a.final_score || 0);
  });
  const totalRanked = candidates.length;
  const avgScore = totalRanked > 0
    ? (candidates.reduce((s, c) => s + (c.final_score || 0), 0) / totalRanked).toFixed(1) : "0.0";
  const topPicks = candidates.filter(c => (c.final_score || 0) >= 80).length;
  const readyNow = candidates.filter(c => mapAvailability(c.notice_period) === "immediate").length;
  const avgSkillMatch = totalRanked > 0
    ? Math.round(candidates.reduce((s, c) => s + (c.score_breakdown?.semantic_fit || 0), 0) / totalRanked) : 0;

  if (candidates.length === 0) {
    return (
      <div className="max-w-[600px] mx-auto text-center py-24">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Search className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">No results yet</h2>
        <p className="text-muted-foreground mb-6">Upload resumes and a job description to generate your first AI ranking.</p>
        <button
          onClick={() => navigate("/")}
          className="h-10 px-6 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
            AI RANKING RESULTS
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">{activeJobTitle}</h1>
          <p className="text-[14px] text-muted-foreground">
            {companyLine && <>{companyLine} · </>}{totalRanked} candidates analyzed
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="h-8 px-3 border border-border hover:bg-muted rounded-lg text-sm font-medium text-foreground flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> New ranking
          </button>
          <button
            onClick={() => exportCSV(sortedCandidates)}
            className="h-8 px-3 border border-border hover:bg-muted rounded-lg text-sm font-medium text-foreground flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={handleShare}
            className="h-8 px-3 bg-primary hover:bg-primary/90 rounded-lg text-sm font-medium text-primary-foreground flex items-center gap-2 transition-colors"
          >
            {copied ? <><Copy className="w-4 h-4" /> Copied!</> : <><Share2 className="w-4 h-4" /> Share</>}
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <KPICard label="Total ranked" value={totalRanked} icon={Users2} color="primary" />
        <KPICard label="Avg. AI score" value={avgScore} icon={TrendingUp} color="success" />
        <KPICard label="Top picks" value={topPicks} icon={Star} color="warning" />
        <KPICard label="Ready now" value={readyNow} icon={CalendarCheck} color="info" />
        <KPICard label="Skill match" value={`${avgSkillMatch}%`} icon={CheckCircle2} color="success" />
      </div>

      {/* Controls Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-5">
        <div className="relative w-full md:w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name, skill, or location..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 bg-card border border-border rounded-lg pl-9 pr-4 text-[13px] focus:outline-none focus:border-primary text-foreground"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 px-3 bg-card border border-border hover:bg-muted rounded-lg text-[13px] font-medium text-foreground appearance-none pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[center_right_0.5rem] bg-[length:16px] flex-1 md:flex-none"
          >
            <option>Sort by: Overall Score</option>
            <option>Sort by: Semantic Match</option>
            <option>Sort by: Experience</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface border-b border-border">
              <th className="w-11 py-3.5 px-6">
                <input 
                  type="checkbox" 
                  checked={sortedCandidates.length > 0 && selected.length === sortedCandidates.length} 
                  onChange={() => toggleAll(sortedCandidates.map(c => c.id))}
                  className="rounded border-border bg-card w-4 h-4 text-primary focus:ring-primary/20 accent-primary" 
                />
              </th>
              <th className="w-12 py-3.5 px-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest text-center">#</th>
              <th className="py-3.5 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Candidate</th>
              <th className="w-[100px] py-3.5 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">AI Score</th>
              <th className="w-[120px] py-3.5 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Skill Match</th>
              <th className="w-[100px] py-3.5 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Experience</th>
              <th className="w-[140px] py-3.5 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Location</th>
              <th className="w-[120px] py-3.5 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Availability</th>
              <th className="w-[160px] py-3.5 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Recommendation</th>
              <th className="w-20 py-3.5 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {sortedCandidates.map((c) => (
              <tr 
                key={c.id} 
                onClick={() => navigate(`/candidates/${c.id}`)}
                className={cn(
                  "border-b border-border hover:bg-muted cursor-pointer group transition-colors",
                  selected.includes(c.id) && "bg-primary/5 hover:bg-primary/10"
                )}
              >
                <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    checked={selected.includes(c.id)} 
                    onChange={() => toggleSelect(c.id)}
                    className="rounded border-border bg-card w-4 h-4 text-primary focus:ring-primary/20 accent-primary" 
                  />
                </td>
                <td className="py-4 px-2 text-center text-[12px] font-bold font-mono text-muted-foreground">
                  {c.overall_rank}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[13px] font-semibold text-white shrink-0">
                      {c.initials || c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-foreground">{c.name}</div>
                      <div className="text-[13px] text-muted-foreground mt-0.5">
                        {c.role} {c.current_company ? `at ${c.current_company}` : ''}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <ScoreBadge score={c.final_score} />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${c.score_breakdown?.semantic_fit || 0}%` }} />
                    </div>
                    <span className="text-[13px] text-muted-foreground">{c.score_breakdown?.semantic_fit || 0}%</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-[13px] text-muted-foreground">
                  {c.years_exp} years
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[13px] truncate max-w-[120px]">{c.location}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <AvailabilityBadge type={mapAvailability(c.notice_period)} />
                </td>
                <td className="py-4 px-4">
                  <RecommendationBadge type={mapRecommendation(c.recommendation)} />
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      title="View profile"
                      onClick={(e) => { e.stopPropagation(); navigate(`/candidates/${c.id}`); }}
                      className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      title={shortlisted.has(c.id) ? "Remove shortlist" : "Shortlist"}
                      onClick={(e) => toggleShortlist(c.id, e)}
                      className={cn(
                        "p-1.5 rounded-md hover:bg-muted transition-colors",
                        shortlisted.has(c.id) ? "text-amber-500" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Star className={cn("w-4 h-4", shortlisted.has(c.id) && "fill-current")} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-surface p-4 px-6 flex items-center justify-between border-t border-border">
          <div className="text-[13px] text-muted-foreground">Showing 1–{sortedCandidates.length} of {sortedCandidates.length} candidates</div>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selected.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-wrap justify-center items-center gap-4 animate-in slide-in-from-bottom-4 w-[90%] max-w-fit">
          <span className="text-[13px] font-medium text-foreground whitespace-nowrap">{selected.length} selected</span>
          <div className="hidden sm:block w-px h-4 bg-border" />
          <button
            onClick={handleShortlistSelected}
            className="text-[13px] font-medium text-amber-500 hover:text-amber-400 transition-colors whitespace-nowrap flex items-center gap-1"
          >
            <Star className="w-3.5 h-3.5" /> Shortlist
          </button>
          <button
            onClick={handleCompareClick}
            disabled={selected.length > 3}
            className="text-[13px] font-medium text-foreground hover:text-muted-foreground transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Compare (max 3)
          </button>
          <button
            onClick={() => exportCSV(candidates.filter(c => selected.includes(c.id)))}
            className="text-[13px] font-medium text-foreground hover:text-muted-foreground transition-colors whitespace-nowrap flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <div className="hidden sm:block w-px h-4 bg-border" />
          <button onClick={() => setSelected([])} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Deselect all</button>
        </div>
      )}
    </div>
  );
}

function KPICard({ label, value, icon: Icon, color }: any) {
  const colorMap: Record<string, string> = {
    primary: "bg-blue-500/10 text-blue-500",
    success: "bg-emerald-500/10 text-emerald-500",
    warning: "bg-amber-500/10 text-amber-500",
    info: "bg-sky-500/10 text-sky-500",
  };

  return (
    <div className="bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-4">
      <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", colorMap[color])}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{label}</div>
        <div className="text-[20px] leading-none font-bold text-foreground font-mono mt-1">{value}</div>
      </div>
    </div>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  let colorClass = "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30";
  if (score >= 80) colorClass = "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30";
  else if (score >= 70) colorClass = "bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30";
  else if (score >= 60) colorClass = "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30";

  return (
    <span className={cn("inline-flex items-center justify-center px-3 py-1 rounded-full text-[14px] font-bold font-mono", colorClass)}>
      {score}
    </span>
  );
}

export function AvailabilityBadge({ type }: { type: 'immediate' | 'within_30d' | 'within_90d' | 'unavailable' }) {
  const config = {
    immediate: { class: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", label: "Available now" },
    within_30d: { class: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20", label: "In 30 days" },
    within_90d: { class: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20", label: "In 3 months" },
    unavailable: { class: "bg-card text-muted-foreground border-border", label: "Not available" }
  };
  const c = config[type];
  return <span className={cn("inline-block px-2.5 py-0.5 rounded-full text-[12px] font-medium border text-justify text-center", c.class)}>{c.label}</span>;
}

export function RecommendationBadge({ type }: { type: 'highly_recommended' | 'recommended' | 'consider' | 'not_recommended' }) {
  const config = {
    highly_recommended: { class: "text-emerald-600 dark:text-emerald-400", label: "Strong yes", icon: <Star className="w-3 h-3 fill-current mr-1 text-emerald-600 dark:text-emerald-400" /> },
    recommended: { class: "text-blue-600 dark:text-blue-400", label: "Recommend", icon: <Check className="w-3.5 h-3.5 mr-1" /> },
    consider: { class: "text-amber-600 dark:text-amber-400", label: "Worth a look", icon: <span className="mr-1">~</span> },
    not_recommended: { class: "text-red-600 dark:text-red-400", label: "Not a fit", icon: <span className="mr-1">✗</span> }
  };
  const c = config[type];
  return (
    <div className={cn("flex items-center text-[13px] font-medium", c.class)}>
      {c.icon} {c.label}
    </div>
  );
}
