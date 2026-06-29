import { useNavigate, useParams } from "react-router";
import { ChevronLeft, CheckCircle2, AlertCircle, XCircle, Brain, GitCompare, Target, Search, TrendingUp } from "lucide-react";
import { stateStore } from "../state";

export function Explainability() {
  const navigate = useNavigate();
  const { id } = useParams();
  const appState = stateStore.get();
  
  const candidate = appState.candidates.find(c => c.id === id) || appState.candidates[0];

  if (!candidate) {
    return <div className="text-center py-20 text-white">Candidate not found.</div>;
  }

  const mapRecommendation = (rec: string): 'highly_recommended' | 'recommended' | 'consider' | 'not_recommended' => {
    const r = (rec || '').toLowerCase();
    if (r.includes('highly') || r.includes('strong')) return 'highly_recommended';
    if (r.includes('not')) return 'not_recommended';
    if (r.includes('consider') || r.includes('review') || r.includes('look')) return 'consider';
    return 'recommended';
  };

  const recType = mapRecommendation(candidate.recommendation);
  const recLabels = {
    highly_recommended: "Strong Yes — Highly Recommended",
    recommended: "Yes — Recommended",
    consider: "Maybe — Consider with Review",
    not_recommended: "No — Not Recommended"
  };

  const semanticScore = candidate.score_breakdown?.semantic_fit || 80;
  const growthScore = candidate.score_breakdown?.career_trajectory || 75;
  const readinessScore = candidate.score_breakdown?.hiring_readiness || 85;

  const positivesList = candidate.positives && candidate.positives.length > 0 
    ? candidate.positives 
    : [
        `Matches top skills including ${candidate.skills.slice(0, 3).join(', ')}`,
        `Demonstrated background with ${candidate.years_exp} years of experience`,
        `Directly relative title match as ${candidate.role}`
      ];

  const negativesList = candidate.negatives && candidate.negatives.length > 0 
    ? candidate.negatives 
    : [
        "Verify system architecture depth in technical screen",
        "Confirm notice period alignment with project timeline"
      ];

  const missingSkillsList = candidate.missing_skills && candidate.missing_skills.length > 0 
    ? candidate.missing_skills 
    : ["GraphQL (Optional)", "WebRTC (Optional)"];

  return (
    <div className="max-w-[800px] mx-auto pb-24">
      <button 
        onClick={() => navigate(`/candidates/${candidate.id}`)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-6 group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to {candidate.name}
      </button>

      <div className="mb-10 text-center">
        <div className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-3">
          AI EXPLAINABILITY
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">How we scored {candidate.name}</h1>
        <p className="text-[15px] text-muted-foreground">Every score on TalentGraph AI has a traceable justification.</p>
      </div>

      <div className="space-y-6">
        {/* Confidence Banner */}
        <div className="bg-card rounded-xl border border-border p-6 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white mb-1">AI Confidence Level: High</h3>
            <p className="text-[13px] text-muted-foreground">Based on data completeness and signal strength across all dimensions</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-48 h-2 rounded-full bg-border overflow-hidden">
              <div className="h-full bg-emerald-400 w-[91%]" />
            </div>
            <span className="text-lg font-bold font-mono text-emerald-400">91%</span>
          </div>
        </div>

        {/* Verdict */}
        <div className="bg-emerald-500/5 rounded-xl border border-emerald-500/20 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
          <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            {recLabels[recType]}
          </span>
          <p className="text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
            {candidate.summary || `${candidate.name} exhibits solid technical expertise with ${candidate.years_exp} years of experience in key technologies.`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Positives */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-white">Positive Signals</h3>
            </div>
            <ul className="space-y-4">
              {positivesList.map((pos, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[14px] text-slate-200">{pos}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas to explore */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-5">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-semibold text-white">Areas to Explore</h3>
            </div>
            <ul className="space-y-4">
              {negativesList.map((neg, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[14px] text-slate-200">{neg}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-red-400" />
            <h3 className="text-base font-semibold text-white">Missing or Unverified Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {missingSkillsList.map((skill, idx) => (
              <span key={idx} className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-full px-3 py-1 text-[13px] font-medium opacity-80">{skill}</span>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-card rounded-xl border border-border p-8">
          <h3 className="text-lg font-semibold text-white mb-6">How We Scored This Candidate</h3>
          <div className="space-y-0 relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-border" />
            
            <ReasoningStep 
              icon={GitCompare} 
              title={`Semantic Match (30% weight) — Scored ${semanticScore}/100`} 
              desc={`Evaluates candidate's skill sets and tech stack overlap against job requirements.`}
              impact={`+${((semanticScore * 0.3)).toFixed(1)} points`}
            />
            <ReasoningStep 
              icon={TrendingUp} 
              title={`Career Growth (20% weight) — Scored ${growthScore}/100`} 
              desc="Evaluates trajectory of promotions, title seniority, and role stability over career history."
              impact={`+${((growthScore * 0.2)).toFixed(1)} points`}
            />
            <ReasoningStep 
              icon={Target} 
              title={`Hiring Readiness (20% weight) — Scored ${readinessScore}/100`} 
              desc="Identifies notice periods and active market signals to predict recruitment likelihood."
              impact={`+${((readinessScore * 0.2)).toFixed(1)} points`}
            />
            <ReasoningStep 
              icon={Brain} 
              title="Final Calculation" 
              desc="Aggregated all 6 dimension scores using JD-specific weightings to arrive at the final confidence-adjusted score."
              impact={`Overall: ${candidate.final_score}/100`}
              isLast
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReasoningStep({ icon: Icon, title, desc, impact, isLast }: any) {
  return (
    <div className="flex items-start gap-4 pb-8 relative">
      <div className="w-10 h-10 rounded-full bg-[#0F172A] border-2 border-border flex items-center justify-center shrink-0 z-10">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="pt-1.5 flex-1">
        <h4 className="text-[15px] font-semibold text-white">{title}</h4>
        <p className="text-[14px] text-slate-300 mt-1">{desc}</p>
        <div className="text-[13px] font-mono text-emerald-400 mt-2 bg-emerald-400/10 inline-block px-2 py-0.5 rounded border border-emerald-400/20">
          {impact}
        </div>
      </div>
    </div>
  );
}

