import { 
  ChevronLeft, MapPin, Mail, Phone, Linkedin, Star, GitCompare, Download, Send, 
  Sparkles, RefreshCw, Award, TrendingUp, Target, ShieldCheck, Crown, CheckSquare
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
    return <div className="text-center py-20 text-white">Candidate not found.</div>;
  }

  const subScores = [
    { label: "Semantic match", icon: GitCompare, weight: "30%", score: candidate.score_breakdown?.semantic_fit || 80, color: "#10B981" },
    { label: "Career growth", icon: TrendingUp, weight: "20%", score: candidate.score_breakdown?.career_trajectory || 75, color: "#38BDF8" },
    { label: "Hiring readiness", icon: Target, weight: "20%", score: candidate.score_breakdown?.hiring_readiness || 85, color: "#10B981" },
    { label: "Profile integrity", icon: ShieldCheck, weight: "10%", score: candidate.score_breakdown?.profile_integrity || 90, color: "#10B981" },
    { label: "Leadership signal", icon: Crown, weight: "10%", score: candidate.score_breakdown?.leadership_signal || 70, color: "#38BDF8" },
    { label: "Skill coverage", icon: CheckSquare, weight: "10%", score: candidate.score_breakdown?.skill_coverage || 85, color: "#10B981" }
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

  const initials = candidate.initials || candidate.name.split(' ').map(n => n[0]).join('');

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
            <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-2xl font-bold text-white shrink-0">
              {initials}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">{candidate.name}</h1>
              <p className="text-lg text-muted-foreground">{candidate.role} {candidate.current_company ? `at ${candidate.current_company}` : ''}</p>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" /> {candidate.location || 'Remote'}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" /> {candidate.email || `${candidate.name.toLowerCase().replace(/\s+/g, '')}@example.com`}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" /> {candidate.phone || '(555) 123-4567'}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Linkedin className="w-4 h-4" /> /in/{candidate.name.toLowerCase().replace(/\s+/g, '')}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <AvailabilityBadge type={mapAvailability(candidate.notice_period)} />
                <RecommendationBadge type={mapRecommendation(candidate.recommendation)} />
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-5">
                <button className="h-9 px-4 bg-primary hover:bg-primary-hover rounded-lg text-sm font-medium text-white flex items-center gap-2 transition-colors">
                  <Star className="w-4 h-4" /> Shortlist
                </button>
                <button onClick={() => navigate("/compare", { state: { ids: [candidate.id] } })} className="h-9 px-4 border border-border hover:bg-white/5 rounded-lg text-sm font-medium text-white flex items-center gap-2 transition-colors">
                  <GitCompare className="w-4 h-4" /> Compare
                </button>
                <button className="h-9 px-4 hover:bg-white/5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white flex items-center gap-2 transition-colors">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <button className="h-9 px-4 hover:bg-white/5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white flex items-center gap-2 transition-colors">
                  <Send className="w-4 h-4" /> Send to hiring manager
                </button>
              </div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="rounded-xl border border-primary/25 bg-primary/5 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-base font-semibold text-primary">AI Executive Summary</h3>
              </div>
              <button className="p-1.5 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/10 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[15px] text-slate-200 leading-relaxed">
              {candidate.summary || `${candidate.name} is a highly qualified candidate with ${candidate.years_exp} years of experience. They have demonstrated proficiency in skills such as ${candidate.skills.slice(0, 5).join(', ')}.`}
            </p>
            <button onClick={() => navigate(`/candidates/${candidate.id}/explainability`)} className="mt-4 text-sm text-primary hover:underline">
              See how this score was calculated →
            </button>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Work experience</h2>
            <div className="space-y-0">
              {candidate.experience && candidate.experience.length > 0 ? (
                candidate.experience.map((exp: any, i: number) => (
                  <ExperienceItem 
                    key={i}
                    company={exp.company || "Company"} 
                    title={exp.role || "Software Engineer"} 
                    date={exp.duration || exp.date || "N/A"} 
                    loc={exp.location || "Remote"}
                    achievements={exp.bullets || exp.achievements || []}
                    isLast={i === candidate.experience.length - 1}
                  />
                ))
              ) : (
                <ExperienceItem 
                  company={candidate.current_company || "Previous Company"} 
                  title={candidate.role || "Software Engineer"} 
                  date={`${candidate.years_exp} years total`} 
                  loc={candidate.location || "Remote"}
                  achievements={[`Demonstrated strong proficiency in ${candidate.skills.slice(0, 4).join(', ')}`]}
                  isLast={true}
                />
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Education</h2>
            <div className="bg-card rounded-xl border border-border p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#0F172A] border border-[#1E293B] flex items-center justify-center font-bold text-muted-foreground shrink-0">
                EDU
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Relevant Higher Education</h3>
                <div className="text-[14px] text-slate-300 mt-0.5">Computer Science & Engineering</div>
                <div className="text-[13px] text-muted-foreground mt-0.5">Graduated</div>
              </div>
            </div>
          </div>


          {/* Certifications */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Certifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card rounded-xl border border-border p-4">
                <Award className="w-4 h-4 text-warning" />
                <div className="text-[13px] font-semibold text-white mt-2">AWS Certified Solutions Architect</div>
                <div className="text-[12px] text-muted-foreground mt-0.5">Amazon Web Services</div>
                <div className="text-[12px] font-mono text-muted-foreground mt-1">2021</div>
              </div>
              <div className="bg-card rounded-xl border border-border p-4">
                <Award className="w-4 h-4 text-warning" />
                <div className="text-[13px] font-semibold text-white mt-2">Certified Kubernetes Administrator</div>
                <div className="text-[12px] text-muted-foreground mt-0.5">Cloud Native Computing Foundation</div>
                <div className="text-[12px] font-mono text-muted-foreground mt-1">2023</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Sticky */}
        <div className="w-full lg:w-[45%]">
          <div className="sticky top-6 space-y-6">
            <div className="bg-card rounded-xl border border-border shadow-sm p-8">
              <div className="flex justify-center">
                <ScoreRing overall={candidate.final_score} scores={subScores} />
              </div>
              
              <div className="flex justify-center mt-4">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-sm font-bold">
                  {candidate.final_score >= 90 ? "A+ — Exceptional Match" :
                   candidate.final_score >= 80 ? "A — Strong Match" :
                   candidate.final_score >= 70 ? "B — Good Match" :
                   candidate.final_score >= 60 ? "C — Average Match" : "D — Weak Match"}
                </span>
              </div>


              <div className="mt-8 space-y-3">
                {subScores.map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <s.icon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-[13px] text-slate-300">{s.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 rounded-full bg-border overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${s.score}%`, backgroundColor: s.color }} />
                      </div>
                      <span className="text-[14px] font-bold font-mono text-white w-7 text-right" style={{ color: s.color }}>{s.score}</span>
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
    <div className="flex gap-4 relative">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center font-bold text-white shrink-0 z-10">
          {company[0]}
        </div>
        {!isLast && <div className="w-[2px] h-full bg-border mt-2" />}
      </div>
      <div className={cn("flex-1 pb-10", isLast && "pb-0")}>
        <h3 className="text-[16px] font-semibold text-white">{title} at {company}</h3>
        <div className="text-[13px] text-muted-foreground mt-0.5">{date}</div>
        <div className="text-[13px] text-muted-foreground mt-0.5">{loc}</div>
        <ul className="mt-3 space-y-2">
          {achievements.map((a: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-[14px] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0 mt-1.5" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
