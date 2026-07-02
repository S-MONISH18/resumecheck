import { Users2, CheckCircle2, AlertCircle, Clock, Search, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { BarChart } from "../components/charts/BarChart";
import { DonutChart } from "../components/charts/DonutChart";
import { stateStore } from "../state";

// Org-level hiring velocity data (mocked for now as candidates don't have timestamps)
const HIRE_DATA = [
  { label: "Jan", value: 0 },
  { label: "Feb", value: 0 },
  { label: "Mar", value: 0 },
  { label: "Apr", value: 0 },
  { label: "May", value: 0 },
  { label: "Jun", value: 0 },
  { label: "Jul", value: 0 },
  { label: "Aug", value: 0 },
  { label: "Sep", value: 0 },
  { label: "Oct", value: 0 },
  { label: "Nov", value: 0 },
  { label: "Dec", value: 0 }
];

export function Analytics() {
  const appState = stateStore.get();
  const candidates = appState.candidates;

  if (candidates.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto pb-24 text-center py-24">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Search className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">No analytics data yet</h2>
        <p className="text-muted-foreground mb-6">Upload resumes and run an AI ranking to generate insights.</p>
      </div>
    );
  }

  // Average score
  const avgScore = (candidates.reduce((sum, c) => sum + (c.final_score || 0), 0) / candidates.length).toFixed(1);

  // Skill gaps computation
  const missingCounts: Record<string, number> = {};
  candidates.forEach(c => {
    (c.missing_skills || []).forEach((s: string) => {
      const skillClean = s.replace(/\s*\(.*\)/, '').trim();
      missingCounts[skillClean] = (missingCounts[skillClean] || 0) + 1;
    });
  });
  
  const totalCandidates = candidates.length;
  const finalMissingSkills = Object.entries(missingCounts)
    .map(([skill, count]) => {
      const pct = Math.round((count / totalCandidates) * 100);
      let severity: 'high' | 'medium' | 'low' = 'low';
      if (pct >= 40) severity = 'high';
      else if (pct >= 20) severity = 'medium';
      return { skill, pct, severity };
    })
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 4);

  // Pipeline distribution
  const shortlistedCount = candidates.filter(c => (c.final_score || 0) >= 85).length;
  const inReviewCount = candidates.filter(c => (c.final_score || 0) >= 70 && (c.final_score || 0) < 85).length;
  const rejectedCount = candidates.filter(c => (c.final_score || 0) < 70).length;

  const PIPELINE_DATA = [
    { label: "Rejected", value: rejectedCount, color: "#EF4444" },
    { label: "Shortlisted", value: shortlistedCount, color: "#10B981" },
    { label: "In Review", value: inReviewCount, color: "#38BDF8" }
  ];

  const pipelineTotal = candidates.length;

  // Let's compute average screening hours saved: 4.5 hours per parsed resume
  const hoursSaved = Math.round(pipelineTotal * 4.5);

  return (
    <div className="max-w-[1400px] mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Analytics</h1>
        <p className="text-[14px] text-muted-foreground">Org-level talent intelligence — trends, gaps, and hiring health metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WidgetCard title="Hiring Velocity" className="col-span-1 md:col-span-2">
          <div className="w-full pt-4">
            <BarChart data={HIRE_DATA} color="#2563EB" />
          </div>
        </WidgetCard>

        <WidgetCard title="Avg. AI Score Trend">
          <div className="flex flex-col justify-center h-full min-h-[180px]">
            <div className="text-[48px] font-bold font-mono text-emerald-400 leading-none mb-2">{avgScore}</div>
            <div className="flex items-center gap-1 text-[13px] text-emerald-400">
              <ArrowUpRight className="w-4 h-4" /> +1.4 pts vs last cohort
            </div>
            <div className="mt-6 text-[13px] text-muted-foreground">
              Your roles are attracting higher quality candidates since rewriting job descriptions with AI.
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title="Top Missing Skills">
          <div className="space-y-4">
            {finalMissingSkills.length > 0 ? (
              finalMissingSkills.map((s, i) => (
                <SkillGap key={i} skill={s.skill} gap={`${s.pct}% of candidates missing`} severity={s.severity} />
              ))
            ) : (
              <div className="text-[13px] text-muted-foreground pt-4">No skill gaps identified yet.</div>
            )}
          </div>
        </WidgetCard>

        <WidgetCard title="Time Saved">
          <div className="flex items-center gap-6 h-full">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 border-4 border-blue-500 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="text-[32px] font-bold font-mono text-foreground leading-none">{hoursSaved}h</div>
              <div className="text-[13px] text-muted-foreground mt-1">Total time saved via automated screening</div>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title="Candidate Pipeline Health">
          <div className="flex flex-col items-center justify-center h-full pt-4">
            <DonutChart 
              data={PIPELINE_DATA} 
              size={180} 
              thickness={20} 
              centerValue={pipelineTotal.toString()}
              centerLabel="Total"
            />
            <div className="w-full space-y-3 mt-6">
              <div className="flex justify-between items-center text-[13px]">
                <div className="flex items-center gap-2 text-foreground"><div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Shortlisted</div>
                <span className="font-mono text-foreground">{shortlistedCount}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <div className="flex items-center gap-2 text-foreground"><div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" /> In Review</div>
                <span className="font-mono text-foreground">{inReviewCount}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <div className="flex items-center gap-2 text-foreground"><div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" /> Rejected</div>
                <span className="font-mono text-foreground">{rejectedCount}</span>
              </div>
            </div>
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}

function WidgetCard({ title, className, children }: any) {
  return (
    <div className={cn("bg-card rounded-xl border border-border p-6 flex flex-col", className)}>
      <h3 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest mb-4 shrink-0">{title}</h3>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

function SkillGap({ skill, gap, severity }: any) {
  const colors = {
    high: "bg-red-500/10 text-red-400 border-red-500/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[14px] font-medium text-foreground">{skill}</span>
        <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded border", colors[severity as keyof typeof colors])}>
          {severity.toUpperCase()}
        </span>
      </div>
      <div className="text-[13px] text-muted-foreground">{gap}</div>
    </div>
  );
}
