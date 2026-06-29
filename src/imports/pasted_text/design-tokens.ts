{
  "meta": {
    "version": "2.0.0",
    "prompt_type": "enterprise_saas_ui_spec",
    "target_tools": ["Cursor", "Windsurf", "v0.dev", "Lovable", "Bolt"],
    "output_format": "Next.js 15 App Router + TypeScript + Tailwind CSS v4 + shadcn/ui"
  },

  "project": {
    "name": "TalentGraph AI",
    "tagline": "Beyond Resume Matching. Predict Hiring Success.",
    "description": "An AI-powered Talent Intelligence Platform that ranks candidates based on predicted hiring success — not keyword matching. Built for enterprise recruiting teams and talent acquisition leads.",
    "domain": "B2B SaaS / HR Tech / AI Hiring Intelligence",
    "target_users": [
      "Corporate Recruiters",
      "Talent Acquisition Leads",
      "Hiring Managers",
      "HR Directors",
      "Staffing Agency Teams"
    ],
    "core_value_props": [
      "Predict who will succeed — not just who matches keywords",
      "Explainable AI scores every recruiter can trust",
      "Rank 100 candidates in under 5 seconds",
      "Eliminate bias with structured, auditable reasoning"
    ]
  },

  "design_system": {
    "philosophy": "Premium-minimal enterprise AI tool. Every pixel earns its place. Inspired by Linear's density, Stripe's trust, Vercel's speed, and OpenAI's clarity.",
    "aesthetic": "Dark mode glassmorphism with enterprise restraint — glass effects are subtle accents, not the dominant UI pattern.",
    "signature_element": "The AI Score Ring — a multi-arc circular gauge that decomposes the overall score into 6 weighted sub-dimensions with animated stroke drawing on load.",

    "color_tokens": {
      "bg_base": "#020617",
      "bg_surface": "#0F172A",
      "bg_card": "#1E293B",
      "bg_card_hover": "#243347",
      "bg_glass": "rgba(30, 41, 59, 0.6)",
      "bg_glass_border": "rgba(51, 65, 85, 0.5)",
      "primary": "#2563EB",
      "primary_hover": "#1D4ED8",
      "primary_glow": "rgba(37, 99, 235, 0.25)",
      "secondary": "#7C3AED",
      "secondary_glow": "rgba(124, 58, 237, 0.2)",
      "accent_sky": "#38BDF8",
      "accent_sky_glow": "rgba(56, 189, 248, 0.15)",
      "success": "#10B981",
      "success_bg": "rgba(16, 185, 129, 0.1)",
      "warning": "#F59E0B",
      "warning_bg": "rgba(245, 158, 11, 0.1)",
      "danger": "#EF4444",
      "danger_bg": "rgba(239, 68, 68, 0.1)",
      "text_primary": "#F8FAFC",
      "text_secondary": "#CBD5E1",
      "text_muted": "#64748B",
      "text_disabled": "#334155",
      "border_default": "#334155",
      "border_subtle": "#1E293B",
      "border_strong": "#475569",
      "score_excellent": "#10B981",
      "score_good": "#2563EB",
      "score_fair": "#F59E0B",
      "score_poor": "#EF4444"
    },

    "typography": {
      "font_family_display": "Inter, system-ui, sans-serif",
      "font_family_mono": "JetBrains Mono, Fira Code, monospace",
      "scale": {
        "display_2xl": "clamp(2rem, 4vw, 3.5rem) / font-weight: 800 / tracking: -0.04em",
        "display_xl": "clamp(1.5rem, 3vw, 2.5rem) / font-weight: 700 / tracking: -0.03em",
        "heading_lg": "1.25rem / font-weight: 700 / tracking: -0.02em",
        "heading_md": "1rem / font-weight: 600 / tracking: -0.01em",
        "body_md": "0.875rem / font-weight: 400 / line-height: 1.6",
        "body_sm": "0.8125rem / font-weight: 400 / line-height: 1.5",
        "label": "0.75rem / font-weight: 500 / tracking: 0.04em / uppercase",
        "mono_sm": "0.75rem / font-weight: 400 / JetBrains Mono",
        "score_display": "clamp(2rem, 5vw, 4rem) / font-weight: 800 / tabular-nums"
      }
    },

    "spacing": {
      "page_padding": "px-6 md:px-8 lg:px-10",
      "section_gap": "gap-6",
      "card_padding": "p-5 md:p-6",
      "compact_padding": "p-3 md:p-4"
    },

    "border_radius": {
      "card": "rounded-xl",
      "button": "rounded-lg",
      "badge": "rounded-full",
      "input": "rounded-lg",
      "modal": "rounded-2xl",
      "tooltip": "rounded-md"
    },

    "shadows": {
      "card": "shadow-[0_0_0_1px_rgba(51,65,85,0.5),0_4px_24px_rgba(0,0,0,0.4)]",
      "card_hover": "shadow-[0_0_0_1px_rgba(37,99,235,0.4),0_8px_32px_rgba(37,99,235,0.15)]",
      "glow_primary": "shadow-[0_0_20px_rgba(37,99,235,0.3)]",
      "glow_success": "shadow-[0_0_20px_rgba(16,185,129,0.3)]",
      "modal": "shadow-[0_0_0_1px_rgba(51,65,85,0.5),0_24px_64px_rgba(0,0,0,0.7)]"
    },

    "glass_effect": {
      "css": "backdrop-filter: blur(12px); background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(51, 65, 85, 0.5);",
      "tailwind": "backdrop-blur-xl bg-slate-800/60 border border-slate-700/50",
      "usage": "Sidebar, modals, floating tooltips, score overlay cards only — not primary cards"
    },

    "animation": {
      "duration_fast": "150ms",
      "duration_base": "250ms",
      "duration_slow": "400ms",
      "duration_entrance": "600ms",
      "easing_default": "cubic-bezier(0.16, 1, 0.3, 1)",
      "easing_spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      "score_ring_draw": "stroke-dashoffset animation 1200ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
      "counter_increment": "requestAnimationFrame counter from 0 to target over 800ms",
      "card_entrance": "opacity 0→1 + translateY(8px)→0 over 400ms staggered by index * 60ms"
    }
  },

  "component_library": {
    "atoms": {
      "ScoreBadge": {
        "props": ["score: number", "size?: 'sm' | 'md' | 'lg'"],
        "variants": {
          "85-100": "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
          "70-84": "bg-blue-500/15 text-blue-400 border border-blue-500/30",
          "50-69": "bg-amber-500/15 text-amber-400 border border-amber-500/30",
          "0-49": "bg-red-500/15 text-red-400 border border-red-500/30"
        },
        "display": "Shows numeric score with color-coded pill, e.g., '87' in green"
      },
      "RecommendationBadge": {
        "props": ["type: 'highly_recommended' | 'recommended' | 'consider' | 'not_recommended'"],
        "variants": {
          "highly_recommended": "⚡ Strongly Recommend — emerald with lightning icon",
          "recommended": "✓ Recommend — blue with check icon",
          "consider": "~ Consider — amber with info icon",
          "not_recommended": "✗ Not a Fit — red with x icon"
        }
      },
      "ProgressRing": {
        "props": ["value: number", "size: number", "strokeWidth: number", "color: string", "animated?: boolean"],
        "implementation": "SVG circle with stroke-dasharray and animated stroke-dashoffset"
      },
      "SkeletonCard": {
        "animation": "Shimmer gradient left-to-right over 1.5s infinite",
        "colors": "from-slate-800 via-slate-700 to-slate-800"
      },
      "Tooltip": {
        "trigger": "hover or focus",
        "delay": "300ms show, 100ms hide",
        "style": "bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-xs text-slate-200 shadow-xl",
        "arrow": true
      },
      "StatusDot": {
        "variants": {
          "active": "w-2 h-2 rounded-full bg-emerald-400 animate-pulse",
          "idle": "w-2 h-2 rounded-full bg-slate-500",
          "processing": "w-2 h-2 rounded-full bg-blue-400 animate-ping"
        }
      }
    },

    "molecules": {
      "KPICard": {
        "structure": {
          "header": "Icon + Label + Trend Arrow",
          "value": "Large animated counter (score_display typography)",
          "footer": "Subtext or comparison e.g. '+12% vs last batch'"
        },
        "hover_state": "Border transitions to primary_glow, subtle scale(1.01) transform",
        "icon_style": "16x16 Lucide icon in a 32x32 rounded-lg container with color-matched bg-opacity-15"
      },
      "CandidateRow": {
        "columns": [
          "rank (bold mono)",
          "avatar + name + headline",
          "overall score (ScoreBadge)",
          "semantic match (mini progress bar)",
          "experience",
          "location",
          "availability (badge)",
          "recommendation (RecommendationBadge)",
          "actions (View, Compare, Shortlist)"
        ],
        "row_height": "64px",
        "hover": "bg-slate-800/80 with left border accent in primary color"
      },
      "PipelineStep": {
        "states": ["pending", "active", "complete", "error"],
        "active_animation": "Pulsing glow ring + rotating spinner inside icon",
        "complete_animation": "Check icon with scale spring animation",
        "connector": "Vertical dashed line between steps, fills solid on complete"
      },
      "FilterChip": {
        "style": "bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-full px-3 py-1",
        "active": "bg-blue-500/20 border-blue-500/50 text-blue-300",
        "close_icon": "X icon appears on hover/active"
      }
    },

    "organisms": {
      "Sidebar": {
        "width_expanded": "240px",
        "width_collapsed": "64px",
        "transition": "width 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        "top_section": "Logo + Product name (hides to icon on collapse)",
        "nav_items": [
          { "icon": "LayoutDashboard", "label": "Dashboard", "route": "/" },
          { "icon": "Search", "label": "Candidate Search", "route": "/search" },
          { "icon": "Sparkles", "label": "AI Ranking", "route": "/ranking", "badge": "New" },
          { "icon": "BarChart3", "label": "Analytics", "route": "/analytics" },
          { "icon": "FileText", "label": "Reports", "route": "/reports" },
          { "icon": "Settings", "label": "Settings", "route": "/settings" }
        ],
        "active_item": "bg-blue-500/15 text-blue-400 border-r-2 border-blue-500",
        "bottom_section": "User avatar + name + Plan badge + Collapse toggle",
        "collapse_trigger": "ChevronLeft/Right icon at bottom-left of sidebar"
      },
      "Header": {
        "height": "56px",
        "left": "Breadcrumb navigation with page title",
        "center": "Global search bar (Cmd+K shortcut hint) — expands on focus",
        "right": [
          "Upload button (primary CTA)",
          "Notifications bell with unread badge",
          "Divider",
          "Avatar with dropdown (Profile, Billing, Logout)"
        ]
      },
      "ScoreRing": {
        "description": "Signature component — multi-arc decomposed score ring",
        "outer_ring": "Overall score (0-100) drawn as arc, color-coded by range",
        "inner_arcs": "6 sub-score arcs arranged concentrically or as segments",
        "center": "Large score number + grade label (A+, B, C etc.)",
        "legend": "Dot + label + value list below ring",
        "animation": "Each arc draws sequentially with 100ms stagger, counter increments",
        "dimensions_shown": [
          "Semantic Match",
          "Career Growth",
          "Hiring Readiness",
          "Profile Integrity",
          "Leadership Signal",
          "Skill Coverage"
        ]
      },
      "RadarChart": {
        "library": "Recharts RadarChart",
        "axes": ["Skills", "Experience", "Growth", "Leadership", "Projects", "Culture Fit"],
        "fill": "rgba(37,99,235,0.2)",
        "stroke": "#2563EB",
        "comparison_fill": "rgba(124,58,237,0.15)",
        "comparison_stroke": "#7C3AED",
        "animation": "RadarChart with isAnimationActive={true} animationDuration={800}"
      },
      "UploadZone": {
        "states": ["idle", "hover", "dragging", "uploading", "complete", "error"],
        "idle": "Dashed border border-slate-600 with UploadCloud icon, 'Drop resumes here or click to browse'",
        "hover": "border-blue-500 bg-blue-500/5 transition",
        "dragging": "border-blue-400 bg-blue-500/10 scale(1.01) with animated border pulse",
        "uploading": "Progress bar + file count + spinner",
        "complete": "Green check + file list + 'Ready to analyze'",
        "error": "Red border + error message + retry button",
        "supported_formats": "PDF, DOCX, TXT — up to 50 files, 10MB each",
        "multi_file": true
      }
    }
  },

  "screens": [
    {
      "id": "S1",
      "name": "Landing Dashboard",
      "route": "/",
      "purpose": "Central hub — start a new ranking job or review recent activity",
      "layout": "12-col grid, 3 distinct zones: Upload Hero, Stats Row, Recent Activity",

      "zones": {
        "hero_upload": {
          "grid": "col-span-12 lg:col-span-8",
          "job_description_card": {
            "type": "Textarea card with header",
            "header": "Job Description",
            "placeholder": "Paste the full job description here — role, skills, experience requirements...",
            "character_count": true,
            "parse_button": "Analyze JD (shows extracted skills inline after click)",
            "extracted_skills_display": "Chip list below textarea after parsing"
          },
          "resume_upload_zone": {
            "type": "UploadZone organism (see above)",
            "position": "Below JD card",
            "file_list": "Compact list with filename, size, remove button"
          },
          "generate_button": {
            "label": "Generate AI Rankings",
            "icon": "Sparkles",
            "size": "lg w-full",
            "state_disabled": "Grayed out until JD + at least 1 resume uploaded",
            "state_ready": "Primary blue with glow shadow",
            "state_loading": "Spinner + 'Analyzing...' text, disabled",
            "shortcut_hint": "⌘ + Enter"
          }
        },
        "quick_stats": {
          "grid": "col-span-12 lg:col-span-4",
          "cards": [
            { "label": "Total Candidates Processed", "value": "2,847", "icon": "Users", "trend": "+124 this week", "color": "primary" },
            { "label": "Avg Match Score", "value": "73.4", "icon": "TrendingUp", "trend": "+5.2 pts", "color": "success" },
            { "label": "Jobs Analyzed", "value": "38", "icon": "Briefcase", "trend": "12 active", "color": "secondary" },
            { "label": "Time Saved", "value": "142h", "icon": "Clock", "trend": "vs manual screening", "color": "accent" }
          ]
        },
        "recent_activity": {
          "grid": "col-span-12",
          "two_columns": {
            "recent_jobs": {
              "header": "Recent Jobs",
              "action": "View All →",
              "items": "5 rows: Role title + company + date + candidate count + avg score + status badge",
              "empty_state": "Briefcase icon + 'No jobs yet — paste a job description above to start'"
            },
            "recent_searches": {
              "header": "Recent Candidate Searches",
              "action": "View All →",
              "items": "5 rows: Search query + timestamp + result count + top score",
              "empty_state": "Search icon + 'No searches yet'"
            }
          }
        }
      }
    },

    {
      "id": "S2",
      "name": "AI Processing Screen",
      "route": "/ranking/process",
      "purpose": "Full-screen animated pipeline — shown while AI ranks candidates",
      "layout": "Centered single column, max-width 560px",

      "components": {
        "header": {
          "title": "Analyzing Candidates",
          "subtitle": "Our AI is scoring each candidate across 9 intelligence dimensions"
        },
        "overall_progress": {
          "type": "Circular progress ring — large, 120px diameter",
          "center_text": "Animated percentage 0→100%",
          "color": "Gradient arc from #2563EB to #38BDF8"
        },
        "pipeline_steps": {
          "type": "Vertical step list with connectors",
          "steps": [
            { "id": 1, "label": "Understanding Job Description", "icon": "FileText", "duration_ms": 300 },
            { "id": 2, "label": "Extracting Required Skills", "icon": "Tag", "duration_ms": 400 },
            { "id": 3, "label": "Analyzing Resumes", "icon": "Users", "duration_ms": 600 },
            { "id": 4, "label": "Semantic Matching", "icon": "GitCompare", "duration_ms": 500 },
            { "id": 5, "label": "Career Intelligence", "icon": "TrendingUp", "duration_ms": 400 },
            { "id": 6, "label": "Hiring Readiness Prediction", "icon": "Target", "duration_ms": 350 },
            { "id": 7, "label": "Profile Integrity Check", "icon": "ShieldCheck", "duration_ms": 300 },
            { "id": 8, "label": "Generating Explainability", "icon": "Brain", "duration_ms": 450 },
            { "id": 9, "label": "Ranking Candidates", "icon": "ListOrdered", "duration_ms": 200 }
          ],
          "active_step_style": "Text primary + spinning loader icon + left glow bar",
          "complete_step_style": "Text muted + green check icon + filled connector line",
          "pending_step_style": "Text disabled + grayed icon + dashed connector"
        },
        "live_counter": {
          "text": "Processed {n} of {total} resumes",
          "animation": "Counter increments in real time"
        },
        "estimated_time": {
          "text": "Usually takes 2–5 seconds",
          "position": "Below steps"
        },
        "cancel_link": {
          "text": "Cancel and go back",
          "style": "text-slate-500 hover:text-slate-300 text-sm underline"
        }
      }
    },

    {
      "id": "S3",
      "name": "Candidate Ranking Dashboard",
      "route": "/ranking/[jobId]",
      "purpose": "Primary output screen — ranked candidate table with filters and summary stats",
      "layout": "Full-width with sticky header, scrollable table",

      "zones": {
        "job_context_bar": {
          "content": "Job title + company + date run + total candidates",
          "actions": ["Re-run Analysis", "Export ▾", "Share Link"]
        },
        "kpi_row": {
          "cards": [
            { "label": "Candidates Ranked", "value": "{n}", "icon": "Users2", "color": "text-primary" },
            { "label": "Avg AI Score", "value": "{n}/100", "icon": "BarChart3", "color": "text-success" },
            { "label": "Highly Recommended", "value": "{n}", "icon": "Star", "color": "text-warning" },
            { "label": "Ready to Interview", "value": "{n}", "icon": "CalendarCheck", "color": "text-accent" },
            { "label": "Skill Coverage", "value": "{n}%", "icon": "CheckCircle2", "color": "text-emerald-400" }
          ]
        },
        "controls_bar": {
          "left": "Search candidates (name, skill, location)",
          "right": [
            "Filter ▾ (Score range, Experience, Location, Availability, Recommendation type)",
            "Sort ▾ (Overall Score, Semantic Match, Experience, Career Growth)",
            "View Toggle (Table / Card Grid)",
            "Columns ▾ (show/hide columns)"
          ]
        },
        "active_filters": "FilterChip row — shown when filters active, each removable, 'Clear all' button",
        "candidate_table": {
          "type": "CandidateRow organism (see above)",
          "row_actions": {
            "primary": "View Profile →",
            "secondary": ["Add to Compare", "Shortlist", "Download Report", "Send Email"]
          },
          "bulk_actions": {
            "trigger": "Checkbox select — shows floating action bar at bottom",
            "actions": ["Shortlist Selected", "Export Selected", "Compare Selected (max 3)"]
          },
          "pagination": {
            "type": "Numbered with prev/next",
            "page_sizes": [10, 25, 50],
            "total_display": "Showing {start}–{end} of {total} candidates"
          },
          "empty_state": "No candidates match filters — filter icon + 'Try adjusting your filters'"
        }
      }
    },

    {
      "id": "S4",
      "name": "Candidate Profile",
      "route": "/candidate/[id]",
      "purpose": "Deep-dive on a single candidate — scores, resume, AI explainability",
      "layout": "Two-column sticky: left panel scrolls, right panel is sticky score summary",

      "left_panel": {
        "width": "58%",
        "sections": {
          "profile_header": {
            "content": "Avatar (initials fallback) + Full name + Current title + Location + LinkedIn icon + Email icon + Phone icon",
            "badges": "Availability badge + Recommendation badge",
            "actions": ["Shortlist", "Compare", "Download PDF Report", "Send to Hiring Manager"]
          },
          "ai_summary": {
            "header": "AI Executive Summary",
            "icon": "Sparkles",
            "style": "Glassmorphism card with subtle blue left border",
            "content": "3-4 sentence AI-generated summary of candidate's fit",
            "regenerate": "Small 'Regenerate ↺' button"
          },
          "experience_timeline": {
            "header": "Work Experience",
            "type": "Vertical timeline with company logos (letter fallback)",
            "item": "Company + Title + Duration + Key achievements (bullet list, max 3)"
          },
          "education": {
            "header": "Education",
            "type": "Card list — Institution + Degree + Year + GPA if available"
          },
          "certifications": {
            "header": "Certifications",
            "type": "Badge grid — Name + Issuer + Year"
          }
        }
      },

      "right_panel": {
        "width": "42%",
        "position": "sticky top-20",
        "sections": {
          "score_ring": {
            "component": "ScoreRing organism",
            "overall_score": "Large gauge center",
            "sub_scores": [
              { "label": "Semantic Match", "icon": "GitCompare", "weight": 0.3 },
              { "label": "Career Growth", "icon": "TrendingUp", "weight": 0.2 },
              { "label": "Hiring Readiness", "icon": "Target", "weight": 0.2 },
              { "label": "Profile Integrity", "icon": "ShieldCheck", "weight": 0.1 },
              { "label": "Leadership Signal", "icon": "Crown", "weight": 0.1 },
              { "label": "Skill Coverage", "icon": "CheckSquare", "weight": 0.1 }
            ]
          },
          "radar_chart": {
            "component": "RadarChart organism",
            "height": 280,
            "legend": "Below chart"
          },
          "score_breakdown": {
            "type": "Animated progress bar list",
            "each_row": "Label + score chip + progress bar + weight label"
          },
          "skill_heatmap": {
            "header": "Skill Coverage",
            "type": "Chip grid with match coloring",
            "matched": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
            "partial": "bg-amber-500/15 text-amber-300 border-amber-500/30",
            "missing": "bg-red-500/15 text-red-300 border-red-500/30 line-through opacity-60"
          },
          "career_growth_chart": {
            "type": "Recharts LineChart",
            "x_axis": "Years",
            "y_axis": "Seniority Level (IC1–IC7 / M1–M5)",
            "data": "Inferred from experience timeline",
            "style": "Smooth curve with gradient fill area"
          }
        }
      }
    },

    {
      "id": "S5",
      "name": "AI Explainability",
      "route": "/candidate/[id]/explainability",
      "purpose": "Transparent AI reasoning — every score has a traceable justification",
      "layout": "Single column, max-width 800px, centered",

      "sections": {
        "confidence_header": {
          "type": "Banner card",
          "content": "AI Confidence Level — gauge bar with label ('High Confidence — 91%')",
          "subtext": "Based on data completeness and signal strength across all dimensions"
        },
        "recommendation_verdict": {
          "type": "Large verdict card",
          "content": "Recommendation type badge (large) + one-sentence rationale",
          "style": "Color-coded border matching recommendation type"
        },
        "positive_signals": {
          "header": "Positive Signals",
          "icon": "CheckCircle2",
          "color": "text-emerald-400",
          "items": "List of strings with check icons and source attribution (e.g., 'from resume > skills section')"
        },
        "improvement_areas": {
          "header": "Areas to Explore in Interview",
          "icon": "AlertCircle",
          "color": "text-amber-400",
          "items": "List of strings with amber warning icons"
        },
        "missing_skills": {
          "header": "Missing or Unverified Skills",
          "icon": "XCircle",
          "color": "text-red-400",
          "type": "Chip grid with red styling"
        },
        "reasoning_timeline": {
          "header": "How We Scored This Candidate",
          "type": "Numbered step-by-step reasoning trail",
          "steps": "Each step: dimension name + reasoning sentence + score contribution",
          "style": "Timeline with connecting line, each node is a dimension icon"
        }
      }
    },

    {
      "id": "S6",
      "name": "Candidate Comparison",
      "route": "/compare",
      "purpose": "Side-by-side comparison of 2-3 candidates across all dimensions",
      "layout": "Fixed-column grid — 1 label column + 2-3 candidate columns",

      "header": {
        "candidate_columns": "Avatar + Name + Score badge + Recommendation badge",
        "add_candidate": "Ghost button to add 3rd candidate",
        "close_buttons": "X on each candidate column"
      },
      "comparison_rows": {
        "sections": [
          {
            "label": "Overall AI Score",
            "type": "ProgressRing side by side"
          },
          {
            "label": "Semantic Match",
            "type": "Progress bar"
          },
          {
            "label": "Career Growth",
            "type": "Score chip"
          },
          {
            "label": "Hiring Readiness",
            "type": "Status badge"
          },
          {
            "label": "Skill Match",
            "type": "Chip diff — green matched, red missing per candidate"
          },
          {
            "label": "Experience",
            "type": "Text with highlight on winner"
          },
          {
            "label": "Leadership Signal",
            "type": "Progress bar"
          },
          {
            "label": "Availability",
            "type": "Badge"
          },
          {
            "label": "Profile Integrity",
            "type": "Risk meter bar"
          },
          {
            "label": "Radar Chart",
            "type": "Overlapping RadarChart with both candidates"
          },
          {
            "label": "AI Recommendation",
            "type": "Large RecommendationBadge"
          }
        ],
        "winner_highlight": "Column with highest score gets subtle primary glow border"
      },
      "action_bar": {
        "position": "Bottom sticky",
        "actions": ["Export Comparison PDF", "Share Comparison Link", "Shortlist Top Candidate"]
      }
    },

    {
      "id": "S7",
      "name": "Analytics Dashboard",
      "route": "/analytics",
      "purpose": "Org-level talent intelligence — trends, gaps, and hiring health metrics",
      "layout": "Masonry grid of widgets, responsive 12-col",

      "widgets": [
        {
          "id": "W1",
          "title": "Hiring Funnel",
          "type": "Funnel chart — custom SVG trapezoids",
          "stages": ["Resumes Received", "AI Screened", "Highly Recommended", "Shortlisted", "Interviewed", "Offered"],
          "grid": "col-span-12 lg:col-span-6"
        },
        {
          "id": "W2",
          "title": "Score Distribution",
          "type": "Recharts BarChart — histogram of candidate scores",
          "x": "Score buckets (0-10, 10-20, ..., 90-100)",
          "y": "Number of candidates",
          "color_gradient": "Bars colored by score range (red→yellow→green)",
          "grid": "col-span-12 lg:col-span-6"
        },
        {
          "id": "W3",
          "title": "Top Missing Skills Across All Jobs",
          "type": "Horizontal bar chart",
          "x": "Skill name",
          "y": "Frequency missing",
          "grid": "col-span-12 lg:col-span-8"
        },
        {
          "id": "W4",
          "title": "Average Hiring Readiness",
          "type": "Large gauge + trend sparkline",
          "grid": "col-span-12 lg:col-span-4"
        },
        {
          "id": "W5",
          "title": "Candidate Geography",
          "type": "World map dot plot (lightweight SVG-based or react-simple-maps)",
          "grid": "col-span-12"
        },
        {
          "id": "W6",
          "title": "Profile Integrity Distribution",
          "type": "Recharts PieChart — donut",
          "segments": ["High Integrity", "Medium", "Flagged"],
          "colors": ["#10B981", "#F59E0B", "#EF4444"],
          "grid": "col-span-12 lg:col-span-4"
        },
        {
          "id": "W7",
          "title": "Skill Gap by Role",
          "type": "Grouped bar chart",
          "x": "Role",
          "groups": "Required vs Candidate Average",
          "grid": "col-span-12 lg:col-span-8"
        }
      ],

      "filter_bar": {
        "filters": ["Date Range", "Job Title", "Department", "Location", "Seniority Level"],
        "style": "Horizontal filter bar above widget grid"
      }
    }
  ],

  "ux_patterns": {
    "empty_states": {
      "philosophy": "Every empty state is an invitation to act — not a dead end",
      "pattern": "Centered icon (48px, muted) + Heading + 1-line explanation + Primary CTA button",
      "examples": [
        "No jobs yet → 'Start your first AI ranking — paste a job description above'",
        "No candidates match filters → 'Try wider filters — or upload more resumes'",
        "Analytics with no data → 'Run your first analysis to see trends here'"
      ]
    },
    "error_states": {
      "inline_field": "Red border + red text below field — specific, actionable message",
      "toast_error": "Red toast top-right — 'Something went wrong. Try again ↺'",
      "page_error": "Centered card with icon + message + Retry button"
    },
    "loading_states": {
      "table": "5-row SkeletonCard shimmer",
      "kpi_cards": "Skeleton cards same size as real cards",
      "profile": "Skeleton for each section block",
      "charts": "Gray rectangle placeholder same height as chart"
    },
    "keyboard_shortcuts": {
      "cmd_k": "Open global search",
      "cmd_enter": "Generate rankings (on dashboard)",
      "esc": "Close modals, clear search",
      "j_k": "Navigate candidate rows",
      "v": "View profile of focused row",
      "c": "Add to compare"
    },
    "notifications": {
      "toast_positions": "top-right, auto-dismiss 4000ms",
      "types": ["success (green)", "error (red)", "info (blue)", "warning (amber)"],
      "stack_behavior": "Stack up to 3, oldest disappears first"
    },
    "responsive_breakpoints": {
      "mobile": "< 640px — single column, bottom nav, no sidebar",
      "tablet": "640-1024px — sidebar collapses to icon-only, 2-col grid",
      "desktop": "1024-1280px — expanded sidebar, full grid",
      "wide": "> 1280px — max-width 1440px centered"
    }
  },

  "accessibility": {
    "color_contrast": "All text meets WCAG AA (4.5:1 minimum) against dark backgrounds",
    "focus_rings": "Visible focus ring on all interactive elements: outline-2 outline-offset-2 outline-blue-500",
    "reduced_motion": "@media (prefers-reduced-motion: reduce) — all animations replaced with instant transitions",
    "aria_labels": "Every icon button has aria-label. Score rings have aria-valuenow and aria-label.",
    "screen_reader": "Table has proper thead/tbody/th scope, score values read as '{n} out of 100'",
    "keyboard_nav": "All interactive elements reachable by Tab, dialogs trap focus"
  },

  "file_structure": {
    "app": {
      "layout.tsx": "Root layout — sidebar + header + main",
      "page.tsx": "S1: Landing Dashboard",
      "ranking": {
        "process": { "page.tsx": "S2: AI Processing Screen" },
        "[jobId]": { "page.tsx": "S3: Candidate Ranking Dashboard" }
      },
      "candidate": {
        "[id]": {
          "page.tsx": "S4: Candidate Profile",
          "explainability": { "page.tsx": "S5: AI Explainability" }
        }
      },
      "compare": { "page.tsx": "S6: Candidate Comparison" },
      "analytics": { "page.tsx": "S7: Analytics Dashboard" }
    },
    "components": {
      "layout": ["Sidebar.tsx", "Header.tsx", "PageWrapper.tsx"],
      "atoms": ["ScoreBadge.tsx", "RecommendationBadge.tsx", "ProgressRing.tsx", "SkeletonCard.tsx", "Tooltip.tsx", "StatusDot.tsx", "FilterChip.tsx"],
      "molecules": ["KPICard.tsx", "CandidateRow.tsx", "PipelineStep.tsx", "UploadZone.tsx"],
      "organisms": ["ScoreRing.tsx", "RadarChart.tsx", "CandidateTable.tsx", "ComparisonGrid.tsx"],
      "charts": ["HiringFunnel.tsx", "ScoreDistribution.tsx", "CareerGrowthLine.tsx", "SkillHeatmap.tsx"]
    },
    "lib": {
      "types.ts": "All TypeScript interfaces — Candidate, Job, Score, Dimension, etc.",
      "constants.ts": "Score thresholds, color maps, dimension weights",
      "utils.ts": "Score-to-color, grade calculation, formatters"
    },
    "hooks": ["useUpload.ts", "useRanking.ts", "useCompare.ts", "useKeyboardShortcuts.ts"]
  },

  "typescript_interfaces": {
    "Candidate": {
      "id": "string",
      "name": "string",
      "title": "string",
      "location": "string",
      "email": "string",
      "availability": "'immediate' | 'within_30d' | 'within_90d' | 'not_available'",
      "overall_score": "number (0-100)",
      "recommendation": "'highly_recommended' | 'recommended' | 'consider' | 'not_recommended'",
      "dimensions": "ScoreDimensions",
      "skills_matched": "string[]",
      "skills_missing": "string[]",
      "skills_partial": "string[]",
      "experience_years": "number",
      "education": "Education[]",
      "certifications": "Certification[]",
      "ai_summary": "string",
      "reasoning": "ReasoningStep[]",
      "confidence": "number (0-1)"
    },
    "ScoreDimensions": {
      "semantic_match": "number",
      "career_growth": "number",
      "hiring_readiness": "number",
      "profile_integrity": "number",
      "leadership_signal": "number",
      "skill_coverage": "number"
    },
    "Job": {
      "id": "string",
      "title": "string",
      "description": "string",
      "required_skills": "string[]",
      "nice_to_have_skills": "string[]",
      "experience_min": "number",
      "created_at": "string",
      "status": "'processing' | 'complete' | 'error'"
    }
  },

  "mock_data": {
    "sample_candidate": {
      "id": "c_001",
      "name": "Priya Sharma",
      "title": "Senior Full-Stack Engineer",
      "location": "Bangalore, India",
      "overall_score": 87,
      "recommendation": "highly_recommended",
      "dimensions": {
        "semantic_match": 91,
        "career_growth": 88,
        "hiring_readiness": 85,
        "profile_integrity": 94,
        "leadership_signal": 79,
        "skill_coverage": 83
      },
      "skills_matched": ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
      "skills_missing": ["Kubernetes", "Go"],
      "skills_partial": ["System Design", "CI/CD"],
      "confidence": 0.91,
      "ai_summary": "Priya is a strong match for a senior full-stack role with 6 years of consistent growth across 3 product companies. Her TypeScript and React proficiency directly aligns with the JD. Minor gaps in Kubernetes can be bridged within 2-3 months."
    }
  },

  "implementation_notes": {
    "chart_library": "Use Recharts for all charts — already in the stack, tree-shakeable",
    "animation_library": "Framer Motion for card entrances, page transitions, and score ring animation",
    "svg_score_ring": "Build ScoreRing as a custom SVG component — do not use a chart library for this",
    "upload_library": "react-dropzone for UploadZone — handles drag events and file validation",
    "table_library": "Build CandidateTable with TanStack Table v8 — supports sorting, filtering, pagination, row selection",
    "global_state": "Zustand — minimal stores for: currentJob, candidates, compareList, filters",
    "api_calls": "TanStack Query (React Query) for all data fetching with built-in caching and loading states",
    "form_handling": "React Hook Form + Zod for JD input validation",
    "performance": "Use React.memo on CandidateRow, virtualize table rows with TanStack Virtual if > 50 rows",
    "exports": "PDF via @react-pdf/renderer, CSV via Papa.parse"
  },

  "quality_checklist": [
    "Every interactive element has a hover state",
    "Every data element has a loading skeleton",
    "Every list has an empty state",
    "Every error has an actionable message and recovery path",
    "Every AI score is accompanied by an explanation",
    "Reduced motion media query applied to all animations",
    "Mobile layout tested and usable at 375px width",
    "Dark mode is the only mode — no light mode toggle needed",
    "All colors pass WCAG AA contrast",
    "Sidebar collapse works on tablet and animates smoothly",
    "Bulk actions bar appears only when rows are selected",
    "Score ring animates on mount and on score change"
  ]
}