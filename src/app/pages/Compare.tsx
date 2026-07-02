import { Plus, X, Download, Share2, Star } from "lucide-react";
import { RadarChart } from "../components/charts/RadarChart";
import { ScoreBadge, RecommendationBadge, AvailabilityBadge } from "./RankingResults";

const radarData = [
  { axis: "Skills", val1: 94, val2: 89 },
  { axis: "Experience", val1: 85, val2: 95 },
  { axis: "Growth", val1: 88, val2: 80 },
  { axis: "Leadership", val1: 82, val2: 70 },
  { axis: "Projects", val1: 90, val2: 85 },
  { axis: "Culture Fit", val1: 95, val2: 90 },
];

import { useLocation } from "react-router";
import { stateStore } from "../state";

export function Compare() {
  const location = useLocation();
  const stateData = location.state as { ids?: string[] } | null;
  const compareIds = stateData?.ids || [];

  const appState = stateStore.get();
  const allCandidates = appState.candidates;
  
  // Find selected candidates
  let comparedCandidates = allCandidates.filter(c => compareIds.includes(c.id));
  
  // Fallback to top 2 if less than 2 candidates selected
  if (comparedCandidates.length < 2) {
    comparedCandidates = allCandidates.slice(0, 2);
  }

  const c1 = comparedCandidates[0];
  const c2 = comparedCandidates[1];
  const c3 = comparedCandidates[2]; // Might be undefined

  const radarData = [
    { 
      axis: "Skills Fit", 
      val1: c1?.score_breakdown?.semantic_fit || 0, 
      val2: c2?.score_breakdown?.semantic_fit || 0,
      val3: c3 ? (c3.score_breakdown?.semantic_fit || 0) : undefined 
    },
    { 
      axis: "Exp Match", 
      val1: Math.min(100, (c1?.years_exp || 0) * 10), 
      val2: Math.min(100, (c2?.years_exp || 0) * 10),
      val3: c3 ? Math.min(100, (c3.years_exp || 0) * 10) : undefined 
    },
    { 
      axis: "Trajectory", 
      val1: c1?.score_breakdown?.career_growth || 0, 
      val2: c2?.score_breakdown?.career_growth || 0,
      val3: c3 ? (c3.score_breakdown?.career_growth || 0) : undefined 
    },
    { 
      axis: "Culture Fit", 
      val1: c1?.score_breakdown?.project_relevance || 0, 
      val2: c2?.score_breakdown?.project_relevance || 0,
      val3: c3 ? (c3.score_breakdown?.project_relevance || 0) : undefined 
    },
    { 
      axis: "Readiness", 
      val1: c1?.score_breakdown?.hiring_readiness || 0, 
      val2: c2?.score_breakdown?.hiring_readiness || 0,
      val3: c3 ? (c3.score_breakdown?.hiring_readiness || 0) : undefined 
    },
  ];

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

  const activeJobTitle = appState.activeJobTitle || "Senior Frontend Engineer";

  // Identify candidate with highest score
  const highestScore = Math.max(c1?.final_score || 0, c2?.final_score || 0, c3?.final_score || 0);

  return (
    <div className="max-w-[1200px] mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Compare Candidates</h1>
        <p className="text-[14px] text-muted-foreground">Comparing {comparedCandidates.length} candidates for {activeJobTitle}</p>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        {/* Header Row */}
        <div className="flex border-b border-border bg-muted/30 min-w-max">
          <div className="w-[200px] shrink-0 p-6 flex items-end">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Dimension</span>
          </div>
          {c1 && <CandidateColumnHeader name={c1.name} score={c1.final_score} isWinner={c1.final_score === highestScore} rec={mapRecommendation(c1.recommendation)} />}
          {c2 && <CandidateColumnHeader name={c2.name} score={c2.final_score} isWinner={c2.final_score === highestScore} rec={mapRecommendation(c2.recommendation)} />}
          {c3 ? (
            <CandidateColumnHeader name={c3.name} score={c3.final_score} isWinner={c3.final_score === highestScore} rec={mapRecommendation(c3.recommendation)} />
          ) : (
            <div className="flex-1 min-w-[250px] p-6 flex flex-col items-center justify-center border-l border-border bg-card/20">
              <span className="text-[13px] font-medium text-muted-foreground">No 3rd Candidate</span>
            </div>
          )}
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          <CompareRow label="Semantic Match">
            {c1 && <ProgressBar value={c1.score_breakdown?.semantic_fit || 0} color="bg-blue-400" />}
            {c2 && <ProgressBar value={c2.score_breakdown?.semantic_fit || 0} color="bg-purple-400" />}
            {c3 ? <ProgressBar value={c3.score_breakdown?.semantic_fit || 0} color="bg-emerald-400" /> : <EmptyCell />}
          </CompareRow>
          
          <CompareRow label="Career Growth">
            {c1 && <ScoreBadge score={c1.score_breakdown?.career_growth || 0} />}
            {c2 && <ScoreBadge score={c2.score_breakdown?.career_growth || 0} />}
            {c3 ? <ScoreBadge score={c3.score_breakdown?.career_growth || 0} /> : <EmptyCell />}
          </CompareRow>

          <CompareRow label="Experience">
            {c1 && <div className="text-[13px] text-foreground">{c1.years_exp} years<br/><span className="text-muted-foreground">{c1.current_company || 'N/A'}</span></div>}
            {c2 && <div className="text-[13px] text-foreground">{c2.years_exp} years<br/><span className="text-muted-foreground">{c2.current_company || 'N/A'}</span></div>}
            {c3 ? <div className="text-[13px] text-foreground">{c3.years_exp} years<br/><span className="text-muted-foreground">{c3.current_company || 'N/A'}</span></div> : <EmptyCell />}
          </CompareRow>

          <CompareRow label="Skill Match">
            {c1 && (
              <div className="flex flex-wrap gap-1">
                {(c1.skills || []).slice(0, 3).map((s, idx) => (
                  <span key={idx} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[11px]">{s}</span>
                ))}
              </div>
            )}
            {c2 && (
              <div className="flex flex-wrap gap-1">
                {(c2.skills || []).slice(0, 3).map((s, idx) => (
                  <span key={idx} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[11px]">{s}</span>
                ))}
              </div>
            )}
            {c3 ? (
              <div className="flex flex-wrap gap-1">
                {(c3.skills || []).slice(0, 3).map((s, idx) => (
                  <span key={idx} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[11px]">{s}</span>
                ))}
              </div>
            ) : <EmptyCell />}
          </CompareRow>

          <CompareRow label="Availability">
            {c1 && <AvailabilityBadge type={mapAvailability(c1.notice_period)} />}
            {c2 && <AvailabilityBadge type={mapAvailability(c2.notice_period)} />}
            {c3 ? <AvailabilityBadge type={mapAvailability(c3.notice_period)} /> : <EmptyCell />}
          </CompareRow>

          <CompareRow label="AI Recommendation">
            {c1 && <RecommendationBadge type={mapRecommendation(c1.recommendation)} />}
            {c2 && <RecommendationBadge type={mapRecommendation(c2.recommendation)} />}
            {c3 ? <RecommendationBadge type={mapRecommendation(c3.recommendation)} /> : <EmptyCell />}
          </CompareRow>
        </div>
      </div>

      {/* Shared Radar Chart */}
      <div className="mt-8 bg-card rounded-xl border border-border p-8 flex flex-col items-center">
        <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-6">Radar Comparison</h3>
        <RadarChart data={radarData} size={300} />
        <div className="flex items-center gap-6 mt-6">
          {c1 && (
            <div className="flex items-center gap-2 text-[13px] text-foreground">
              <div className="w-3 h-3 rounded bg-blue-500/40 border border-blue-500" /> {c1.name}
            </div>
          )}
          {c2 && (
            <div className="flex items-center gap-2 text-[13px] text-foreground">
              <div className="w-3 h-3 rounded bg-purple-500/40 border border-purple-500" /> {c2.name}
            </div>
          )}
          {c3 && (
            <div className="flex items-center gap-2 text-[13px] text-foreground">
              <div className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-500" /> {c3.name}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-wrap justify-center items-center gap-4 animate-in slide-in-from-bottom-4 w-[90%] max-w-fit">
        <button className="text-[13px] font-medium text-foreground hover:text-muted-foreground flex items-center gap-2 transition-colors whitespace-nowrap">
          <Download className="w-4 h-4" /> Export PDF
        </button>
        <div className="hidden sm:block w-px h-4 bg-border" />
        <button className="text-[13px] font-medium text-foreground hover:text-muted-foreground flex items-center gap-2 transition-colors whitespace-nowrap">
          <Share2 className="w-4 h-4" /> Share Link
        </button>
        <div className="hidden sm:block w-px h-4 bg-border" />
        <button className="h-8 px-4 bg-primary hover:bg-primary-hover rounded-lg text-sm font-medium text-white flex items-center gap-2 transition-colors whitespace-nowrap">
          <Star className="w-4 h-4" /> Shortlist Winner
        </button>
      </div>
    </div>
  );
}


function CandidateColumnHeader({ name, score, isWinner, rec }: any) {
  return (
    <div className={`flex-1 min-w-[250px] p-6 border-l border-border relative ${isWinner ? 'bg-primary/5' : ''}`}>
      {isWinner && <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400" />}
      <button className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors">
        <X className="w-4 h-4" />
      </button>
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-lg font-bold text-white mb-3">
        {name.split(' ').map((n: string) => n[0]).join('')}
      </div>
      <h3 className="text-[16px] font-semibold text-foreground mb-1">{name}</h3>
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <ScoreBadge score={score} />
        {rec && <RecommendationBadge type={rec} />}
      </div>
    </div>
  );
}


function CompareRow({ label, children }: any) {
  return (
    <div className="flex min-h-[80px] min-w-max">
      <div className="w-[200px] shrink-0 p-6 flex items-center border-r border-border bg-muted/20">
        <span className="text-[13px] font-medium text-foreground">{label}</span>
      </div>
      {Array.isArray(children) ? children.map((child, i) => (
        <div key={i} className={`flex-1 min-w-[250px] p-6 flex items-center ${i < 2 ? 'border-r border-border' : ''}`}>
          {child}
        </div>
      )) : null}
    </div>
  );
}

function ProgressBar({ value, color }: any) {
  return (
    <div className="w-full flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-[13px] font-mono text-foreground">{value}%</span>
    </div>
  );
}

function EmptyCell() {
  return <div className="w-full h-full" />;
}
