import { 
  ChevronLeft, MapPin, Mail, Phone, Linkedin, Star, GitCompare, Download, Send, 
  Sparkles, RefreshCw, Award, TrendingUp, Target, ShieldCheck, Crown, CheckSquare,
  CheckCircle2, AlertTriangle, ShieldAlert
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useNavigate, useParams } from "react-router";
import { AvailabilityBadge, RecommendationBadge } from "./RankingResults";
import { ScoreRing } from "../components/charts/ScoreRing";
import { stateStore } from "../state";

export function CandidateProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const appState = stateStore.get();
  
  const candidate = appState.candidates.find(c => c.id === id) || appState.candidates[0];

  if (!candidate) {
    return <div className="text-center py-20 text-foreground">Candidate not found.</div>;
  }

  const subScores = [
    { label: "Semantic Match",   icon: GitCompare,  score: candidate.score_breakdown?.semantic_fit      || 80, color: "#10B981", tooltip: "Skills matching the JD" },
    { label: "Career Growth",    icon: TrendingUp,  score: candidate.score_breakdown?.career_growth      || 75, color: "#38BDF8", tooltip: "Learning trajectory & promotions" },
    { label: "Hiring Readiness", icon: Target,      score: candidate.score_breakdown?.hiring_readiness   || 85, color: "#10B981", tooltip: "Immediate readiness for the role" },
    { label: "Profile Integrity",icon: ShieldCheck, score: 100 - (candidate.score_breakdown?.profile_integrity_penalty || 0), color: "#10B981", tooltip: "Consistency and authenticity of resume" },
    { label: "Leadership Signal",icon: Crown,       score: candidate.score_breakdown?.leadership          || 70, color: "#38BDF8", tooltip: "Founder, hackathons, team leadership roles" },
    { label: "Skill Coverage",   icon: CheckSquare, score: candidate.score_breakdown?.project_relevance   || 85, color: "#10B981", tooltip: "Relevance of past projects to JD" }
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

  const initials = candidate.initials || candidate.name.split(' ').map((n: string) => n[0]).join('');
  const expText = candidate.years_exp > 0 ? `${candidate.years_exp} years of experience` : "Early Career / Internships";
  const allSkills = candidate.skills || [];
  const missingSkills = candidate.missing_skills || [];
  const matchedSkills = allSkills.filter((s: string) => !missingSkills.includes(s));

  return (
    <div className="max-w-[1400px] mx-auto pb-24">
      {/* Back Nav */}
      <button 
        onClick={() => navigate("/ranking/123/results")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to results
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Panel */}
        <div className="w-full lg:w-[55%] space-y-12">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-[84px] h-[84px] rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white shrink-0 shadow-lg">
              {initials}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-1">{candidate.name}</h1>
              <p className="text-lg font-medium text-muted-foreground">{candidate.role} {candidate.current_company ? `at ${candidate.current_company}` : ''}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" /> {candidate.location || 'Remote'}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" /> {candidate.email || `${candidate.name.toLowerCase().replace(/\s+/g, '')}@example.com`}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" /> {candidate.phone || '(555) 123-4567'}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors">
                  <Linkedin className="w-4 h-4" /> /in/{candidate.name.toLowerCase().replace(/\s+/g, '')}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <AvailabilityBadge type={mapAvailability(candidate.notice_period)} />
                <RecommendationBadge type={mapRecommendation(candidate.recommendation)} />
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mt-6">
                <button className="h-10 px-5 bg-primary hover:bg-primary/90 rounded-lg text-sm font-semibold text-primary-foreground flex items-center gap-2 transition-all shadow-sm">
                  <Star className="w-4 h-4" /> Shortlist
                </button>
                <button onClick={() => navigate("/compare", { state: { ids: [candidate.id] } })} className="h-10 px-5 border border-border hover:bg-muted rounded-lg text-sm font-semibold text-foreground flex items-center gap-2 transition-all">
                  <GitCompare className="w-4 h-4" /> Compare
                </button>
                <button className="h-10 px-4 hover:bg-muted rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all">
                  <Download className="w-4 h-4" /> PDF
                </button>
              </div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-primary">AI Executive Summary</h3>
              </div>
              <button className="p-1.5 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/10 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[15px] text-foreground leading-relaxed">
              {candidate.executive_summary || candidate.career_summary || `${candidate.name} is a highly qualified candidate with ${expText}. They have demonstrated proficiency in skills such as ${allSkills.slice(0, 5).join(', ')}.`}
            </p>
            <button className="mt-4 text-sm font-medium text-primary hover:underline flex items-center gap-1">
              See how this score was calculated <ChevronLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          {/* Strengths & AI Confidence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> Key Strengths
              </h3>
              <ul className="space-y-3">
                {(candidate.strengths || []).map((strength: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span className="leading-snug">{strength}</span>
                  </li>
                ))}
                {(!candidate.strengths || candidate.strengths.length === 0) && (
                  <li className="text-sm text-muted-foreground">No specific strengths extracted.</li>
                )}
              </ul>
            </div>
            
            <div className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                <ShieldCheck className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-foreground mb-1">
                {candidate.confidence || 94}%
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                AI Confidence Score
              </div>
              <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">
                Based on data completeness and signal strength.
              </p>
            </div>
          </div>

          {/* Matched vs Missing Skills */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Skills Assessment</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4" /> Matched Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.length > 0 ? matchedSkills.map((s: string, i: number) => (
                    <span key={i} className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 rounded-md px-3 py-1.5 text-[13px] font-semibold">
                      {s}
                    </span>
                  )) : <span className="text-sm text-muted-foreground">No matching skills found.</span>}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4" /> Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.length > 0 ? missingSkills.map((s: string, i: number) => (
                    <span key={i} className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 rounded-md px-3 py-1.5 text-[13px] font-semibold">
                      {s}
                    </span>
                  )) : <span className="text-sm text-muted-foreground">No missing critical skills.</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground mb-8">Work Experience</h2>
            <div className="space-y-0">
              {candidate.experience && candidate.experience.length > 0 ? (
                candidate.experience.map((exp: any, i: number) => (
                  <ExperienceItem 
                    key={i}
                    company={exp.company} 
                    title={exp.title || exp.role} 
                    date={exp.period || exp.date} 
                    loc={exp.location}
                    achievements={exp.highlights || exp.bullets || []}
                    isLast={i === candidate.experience.length - 1}
                  />
                ))
              ) : (
                <ExperienceItem 
                  company={candidate.current_company || "Previous Company"} 
                  title={candidate.role || "Software Engineer"} 
                  date={candidate.years_exp > 0 ? `${candidate.years_exp} years total` : "Internship"} 
                  achievements={[`Demonstrated strong proficiency in ${allSkills.slice(0, 4).join(', ')}`]}
                  isLast={true}
                />
              )}
            </div>
          </div>

        </div>

        {/* Right Panel - Sticky */}
        <div className="w-full lg:w-[45%]">
          <div className="sticky top-6 space-y-6">
            <div className="bg-card rounded-xl border border-border shadow-sm p-8">
              
              <div className="flex flex-col items-center justify-center mb-6">
                <ScoreRing overall={candidate.final_score} scores={subScores} />
                <div className="mt-6">
                  <span className={cn(
                    "px-5 py-2 rounded-full text-[15px] font-bold tracking-wide border",
                    candidate.final_score >= 90 ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" :
                    candidate.final_score >= 80 ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" :
                    candidate.final_score >= 70 ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" :
                    candidate.final_score >= 60 ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" : 
                    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                  )}>
                    {candidate.final_score >= 90 ? "A+ — Exceptional Match" :
                     candidate.final_score >= 80 ? "A — Strong Match" :
                     candidate.final_score >= 70 ? "B — Good Match" :
                     candidate.final_score >= 60 ? "C — Average Match" : "D — Weak Match"}
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-border my-8" />

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-foreground mb-2">Score Breakdown</h3>
                {subScores.map((s, i) => (
                  <div key={i} className="flex items-center justify-between group relative" title={s.tooltip}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <s.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <span className="text-[14px] font-medium text-foreground cursor-help border-b border-dashed border-muted-foreground/30">{s.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${s.score}%`, backgroundColor: s.color }} />
                      </div>
                      <span className="text-[15px] font-bold font-mono w-8 text-right text-foreground">{s.score}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceItem({ company, title, date, loc, achievements, isLast }: any) {
  return (
    <div className="flex gap-5 relative">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center font-bold text-foreground shrink-0 z-10 text-lg shadow-sm">
          {company ? company.charAt(0).toUpperCase() : 'C'}
        </div>
        {!isLast && <div className="w-0.5 h-full bg-border mt-3 mb-3" />}
      </div>
      <div className={cn("flex-1 pb-10", isLast && "pb-0")}>
        <h3 className="text-lg font-bold text-foreground tracking-tight">{title}</h3>
        <div className="text-base font-medium text-primary mb-1">{company}</div>
        
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-medium mb-4">
          {date && <span>{date}</span>}
          {date && loc && <span className="w-1 h-1 rounded-full bg-border" />}
          {loc && <span>{loc}</span>}
        </div>
        
        {achievements && achievements.length > 0 && (
          <ul className="space-y-2.5">
            {achievements.map((a: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5 text-[14.5px] text-muted-foreground leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-2" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
