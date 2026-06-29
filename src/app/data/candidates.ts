export type RecommendationLabel =
  | "Highly Recommended"
  | "Recommended"
  | "Consider"
  | "Needs Further Review"
  | "Not Recommended";

export interface Candidate {
  id: string;
  name: string;
  initials: string;
  role: string;
  current_company: string;
  years_exp: number;
  notice_period: string;
  location: string;
  overall_rank: number;
  final_score: number;
  confidence: number;
  recommendation: RecommendationLabel;
  score_breakdown: {
    semantic_fit: number;
    career_growth: number;
    leadership: number;
    hiring_readiness: number;
    availability: number;
    project_relevance: number;
    profile_integrity_penalty: number;
  };
  strengths: string[];
  weaknesses: string[];
  missing_skills: string[];
  skills: string[];
  career_summary: string;
  executive_summary: string;
  reasoning: string[];
  experience: { title: string; company: string; period: string; highlights: string[] }[];
  education: { degree: string; school: string; year: string }[];
  certifications: string[];
}

export const CANDIDATES: Candidate[] = [
  {
    id: "c001",
    name: "Priya Nair",
    initials: "PN",
    role: "Senior ML Engineer",
    current_company: "DeepMind",
    years_exp: 7,
    notice_period: "30 days",
    location: "London, UK",
    overall_rank: 1,
    final_score: 91,
    confidence: 94,
    recommendation: "Highly Recommended",
    score_breakdown: {
      semantic_fit: 96,
      career_growth: 88,
      leadership: 82,
      hiring_readiness: 95,
      availability: 78,
      project_relevance: 93,
      profile_integrity_penalty: 0,
    },
    strengths: [
      "Deep expertise in transformer architectures and RLHF pipelines",
      "7 consecutive years of measurable scope expansion",
      "Published 3 peer-reviewed papers directly relevant to role",
      "Strong open-source portfolio with 2.4k GitHub stars",
    ],
    weaknesses: [
      "Limited experience with on-prem deployment constraints",
      "No formal leadership title yet",
    ],
    missing_skills: ["Kubernetes at scale", "MLflow production usage"],
    skills: ["PyTorch", "RLHF", "Transformers", "Python", "TensorFlow", "RAG", "LangChain", "HuggingFace", "CUDA", "Distributed Training"],
    career_summary: "Progressive ML engineering career at tier-1 AI companies with clear upward trajectory and domain consistency. No gaps.",
    executive_summary: "Exceptional semantic match with demonstrated output velocity. Highest confidence score in the pool. Strong hire.",
    reasoning: [
      "Job requires LLM fine-tuning experience — candidate has 4 years of direct RLHF work",
      "Role calls for research-to-production pipeline ownership — 3 shipped products match this exactly",
      "Career timeline shows zero employment gaps and two internal promotions",
    ],
    experience: [
      { title: "Senior Research Engineer", company: "DeepMind", period: "2022 – Present", highlights: ["Led RLHF pipeline for Gemini fine-tuning", "Reduced inference latency by 34%"] },
      { title: "ML Engineer", company: "Google Brain", period: "2019 – 2022", highlights: ["Built distributed training system for 70B param models", "Published 2 papers at NeurIPS"] },
      { title: "Junior ML Engineer", company: "Waymo", period: "2017 – 2019", highlights: ["Developed perception models for autonomous driving"] },
    ],
    education: [{ degree: "M.Sc. Computer Science (AI)", school: "University of Edinburgh", year: "2017" }],
    certifications: ["Google Professional ML Engineer", "AWS Machine Learning Specialty"],
  },
  {
    id: "c002",
    name: "Marcus Webb",
    initials: "MW",
    role: "Staff Software Engineer",
    current_company: "Stripe",
    years_exp: 10,
    notice_period: "60 days",
    location: "San Francisco, CA",
    overall_rank: 2,
    final_score: 84,
    confidence: 88,
    recommendation: "Recommended",
    score_breakdown: {
      semantic_fit: 81,
      career_growth: 92,
      leadership: 90,
      hiring_readiness: 79,
      availability: 62,
      project_relevance: 77,
      profile_integrity_penalty: 0,
    },
    strengths: [
      "Exceptional leadership trajectory — IC4 to Staff in 3 years",
      "Built and scaled distributed systems serving 200M+ requests/day",
      "Led org-wide migration projects with cross-functional ownership",
    ],
    weaknesses: [
      "60-day notice period reduces urgency fit",
      "Python/ML stack lighter than core requirement",
    ],
    missing_skills: ["PyTorch production experience", "Vector database familiarity"],
    skills: ["Go", "Kubernetes", "gRPC", "PostgreSQL", "Redis", "Kafka", "Python", "Terraform", "AWS", "System Design"],
    career_summary: "Strong systems engineering background with proven leadership growth. ML-adjacent but not ML-native. High ceiling.",
    executive_summary: "Excellent career growth signals and leadership DNA. Consider if role allows 60-day onboarding lead time.",
    reasoning: [
      "Leadership dimension strongly overperforms — scored 90, 15 pts above pool average",
      "Notice period reduces availability score significantly but does not affect quality signals",
      "Skill gap in ML-specific tooling is bridgeable with onboarding investment",
    ],
    experience: [
      { title: "Staff Software Engineer", company: "Stripe", period: "2021 – Present", highlights: ["Architected payments infra serving 200M+ req/day", "Led team of 12 engineers across 3 time zones"] },
      { title: "Senior Software Engineer", company: "Airbnb", period: "2018 – 2021", highlights: ["Built real-time pricing engine", "Migrated monolith to microservices"] },
      { title: "Software Engineer", company: "Palantir", period: "2014 – 2018", highlights: ["Full-stack data pipeline work for government clients"] },
    ],
    education: [{ degree: "B.S. Computer Science", school: "MIT", year: "2014" }],
    certifications: ["AWS Solutions Architect Professional", "CKA (Kubernetes)"],
  },
  {
    id: "c003",
    name: "Sofia Reyes",
    initials: "SR",
    role: "ML Research Scientist",
    current_company: "Cohere",
    years_exp: 5,
    notice_period: "Immediate",
    location: "Toronto, Canada",
    overall_rank: 3,
    final_score: 78,
    confidence: 82,
    recommendation: "Recommended",
    score_breakdown: {
      semantic_fit: 88,
      career_growth: 74,
      leadership: 61,
      hiring_readiness: 84,
      availability: 96,
      project_relevance: 89,
      profile_integrity_penalty: 0,
    },
    strengths: [
      "Immediate availability — strongest availability signal in pool",
      "Direct NLP/LLM research experience from Cohere",
      "High project relevance with 4 production RAG deployments",
    ],
    weaknesses: [
      "Career growth signals plateau after year 3",
      "Limited leadership evidence",
    ],
    missing_skills: ["Distributed training at scale", "Infrastructure ownership"],
    skills: ["Python", "PyTorch", "NLP", "RAG", "LLMs", "HuggingFace", "FastAPI", "Docker", "Pinecone", "Langchain"],
    career_summary: "Strong research-to-production ML scientist with outstanding availability. Growth signals soften mid-career.",
    executive_summary: "Best availability score, strong semantic fit. Ideal if speed-to-hire is a priority.",
    reasoning: [
      "Immediate joining + active job search signals strong availability pull",
      "5 years of continuous LLM research aligns tightly with role requirements",
      "Leadership score of 61 reflects IC-only history",
    ],
    experience: [
      { title: "ML Research Scientist", company: "Cohere", period: "2021 – Present", highlights: ["Shipped 4 production RAG pipelines", "Fine-tuned Command-R for enterprise clients"] },
      { title: "NLP Engineer", company: "Shopify", period: "2019 – 2021", highlights: ["Built multilingual product search", "Reduced query latency by 40%"] },
    ],
    education: [{ degree: "M.Sc. Computational Linguistics", school: "University of Toronto", year: "2019" }],
    certifications: ["Deep Learning Specialization (Coursera)", "MLOps Professional"],
  },
  {
    id: "c004",
    name: "Tomás Herrera",
    initials: "TH",
    role: "Data Scientist → ML Engineer",
    current_company: "Mercado Libre",
    years_exp: 6,
    notice_period: "45 days",
    location: "Buenos Aires, Argentina",
    overall_rank: 4,
    final_score: 65,
    confidence: 71,
    recommendation: "Consider",
    score_breakdown: {
      semantic_fit: 69,
      career_growth: 73,
      leadership: 58,
      hiring_readiness: 66,
      availability: 70,
      project_relevance: 64,
      profile_integrity_penalty: -5,
    },
    strengths: [
      "Strong domain consistency across 6 years",
      "Diverse ML stack evolution (XGBoost → transformers)",
    ],
    weaknesses: [
      "Role transition from DS to MLE partially documented",
      "Minor skill inconsistency flagged by integrity check",
    ],
    missing_skills: ["Large-scale model serving", "A/B testing infrastructure", "LLM fine-tuning"],
    skills: ["Python", "XGBoost", "Spark", "SQL", "TensorFlow", "Airflow", "dbt", "Looker", "Snowflake", "Scikit-learn"],
    career_summary: "Evolving from data science toward ML engineering with decent trajectory. Transition not fully evidenced in portfolio.",
    executive_summary: "Viable candidate with mid-tier signals. Integrity flag is minor. Worth a screening call.",
    reasoning: [
      "Skill inconsistency: listed TensorFlow expertise but only 2 months of evident project usage",
      "Career transition to MLE plausible but portfolio lacks direct shipping evidence",
      "Domain consistency in e-commerce ML is a meaningful positive signal",
    ],
    experience: [
      { title: "ML Engineer", company: "Mercado Libre", period: "2022 – Present", highlights: ["Built recommendation engine for 80M users", "Fraud detection model saving $12M/year"] },
      { title: "Data Scientist", company: "OLX Group", period: "2018 – 2022", highlights: ["Developed pricing models", "Led A/B testing framework"] },
    ],
    education: [{ degree: "B.S. Statistics", school: "Universidad de Buenos Aires", year: "2018" }],
    certifications: ["Google Professional Data Engineer"],
  },
  {
    id: "c005",
    name: "Kenji Watanabe",
    initials: "KW",
    role: "Platform Engineer",
    current_company: "SoftBank Ventures",
    years_exp: 8,
    notice_period: "90 days",
    location: "Tokyo, Japan",
    overall_rank: 5,
    final_score: 41,
    confidence: 58,
    recommendation: "Needs Further Review",
    score_breakdown: {
      semantic_fit: 38,
      career_growth: 61,
      leadership: 67,
      hiring_readiness: 44,
      availability: 35,
      project_relevance: 40,
      profile_integrity_penalty: -12,
    },
    strengths: [
      "Strong infrastructure leadership",
      "Long tenures signal stability",
    ],
    weaknesses: [
      "Very low ML/AI semantic fit",
      "90-day notice severely limits availability",
      "Duplicate project descriptions flagged",
    ],
    missing_skills: ["Python ML stack", "Model training", "NLP", "Vector stores", "MLOps tooling"],
    skills: ["Java", "Terraform", "Kubernetes", "AWS", "GCP", "Jenkins", "Prometheus", "Grafana", "Ansible", "Linux"],
    career_summary: "Platform and infrastructure background with limited ML exposure. Strong ops leader but significant domain mismatch.",
    executive_summary: "Profile integrity concerns and domain mismatch reduce confidence. Not suitable without major reskilling.",
    reasoning: [
      "Integrity: 2 near-identical project descriptions across different employers detected",
      "Semantic fit of 38 reflects fundamental domain gap — platform vs ML engineering",
      "90-day notice + low availability creates a timing risk",
    ],
    experience: [
      { title: "Principal Platform Engineer", company: "SoftBank Ventures", period: "2020 – Present", highlights: ["Managed cloud infra for 40+ portfolio companies", "Led Kubernetes migration"] },
      { title: "DevOps Lead", company: "Rakuten", period: "2016 – 2020", highlights: ["Built CI/CD pipelines for 200+ microservices"] },
    ],
    education: [{ degree: "B.Eng. Information Systems", school: "Keio University", year: "2016" }],
    certifications: ["AWS DevOps Engineer Professional", "GCP Professional Cloud Architect"],
  },
];

export const PIPELINE_STAGES = [
  { id: 1, name: "Understanding Job Description", icon: "Brain" },
  { id: 2, name: "Extracting Skills", icon: "Zap" },
  { id: 3, name: "Analyzing Resumes", icon: "FileText" },
  { id: 4, name: "Semantic Matching", icon: "GitMerge" },
  { id: 5, name: "Career Intelligence", icon: "TrendingUp" },
  { id: 6, name: "Hiring Readiness", icon: "CheckCircle" },
  { id: 7, name: "Profile Integrity", icon: "Shield" },
  { id: 8, name: "Generating Explainability", icon: "Lightbulb" },
  { id: 9, name: "Ranking Candidates", icon: "BarChart3" },
];

export const scoreColor = (score: number): string => {
  if (score >= 85) return "#10B981";
  if (score >= 70) return "#38BDF8";
  if (score >= 55) return "#F59E0B";
  if (score >= 40) return "#F97316";
  return "#EF4444";
};

export const recConfig: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  "Highly Recommended": { bg: "rgba(16,185,129,0.12)", text: "#10B981", border: "rgba(16,185,129,0.25)", dot: "#10B981" },
  Recommended: { bg: "rgba(56,189,248,0.12)", text: "#38BDF8", border: "rgba(56,189,248,0.25)", dot: "#38BDF8" },
  Consider: { bg: "rgba(245,158,11,0.12)", text: "#F59E0B", border: "rgba(245,158,11,0.25)", dot: "#F59E0B" },
  "Needs Further Review": { bg: "rgba(249,115,22,0.12)", text: "#F97316", border: "rgba(249,115,22,0.25)", dot: "#F97316" },
  "Not Recommended": { bg: "rgba(239,68,68,0.12)", text: "#EF4444", border: "rgba(239,68,68,0.25)", dot: "#EF4444" },
};
