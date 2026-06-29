import { useState } from "react";
import { Search, Bell, Sun, Moon, ChevronDown } from "lucide-react";

const SCREEN_TITLES: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "AI-powered talent intelligence overview" },
  ranking: { title: "AI Ranking", subtitle: "Candidate ranking for Senior ML Engineer" },
  profile: { title: "Candidate Profile", subtitle: "Full AI analysis and explainability" },
  processing: { title: "AI Processing", subtitle: "Running 9-stage evaluation pipeline" },
  analytics: { title: "Analytics", subtitle: "Hiring insights and pipeline metrics" },
  comparison: { title: "Comparison", subtitle: "Side-by-side candidate analysis" },
};

interface HeaderProps {
  screen: string;
  darkMode: boolean;
  onToggleDark: () => void;
}

export function Header({ screen, darkMode, onToggleDark }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const info = SCREEN_TITLES[screen] ?? { title: "TalentGraph AI", subtitle: "" };

  return (
    <header
      className="h-14 flex items-center gap-4 px-5 border-b shrink-0"
      style={{
        background: "rgba(15,23,42,0.8)",
        backdropFilter: "blur(12px)",
        borderColor: "#334155",
      }}
    >
      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-white leading-none">{info.title}</h1>
        <p className="text-xs mt-0.5 leading-none" style={{ color: "#64748B" }}>{info.subtitle}</p>
      </div>

      {/* Search */}
      <div
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all"
        style={{
          background: searchFocused ? "rgba(37,99,235,0.08)" : "#1E293B",
          borderColor: searchFocused ? "rgba(37,99,235,0.4)" : "#334155",
          width: searchFocused ? 260 : 200,
          transition: "all 0.2s ease",
        }}
      >
        <Search size={13} style={{ color: "#64748B" }} />
        <input
          type="text"
          placeholder="Search candidates, jobs…"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="bg-transparent text-xs outline-none flex-1 text-white placeholder:text-slate-500"
          style={{ fontFamily: "'Inter', sans-serif" }}
        />
        <kbd className="text-xs px-1 py-0.5 rounded" style={{ background: "#334155", color: "#64748B", fontSize: 10 }}>⌘K</kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ color: "#64748B" }}
        >
          <Bell size={15} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: "#2563EB" }}
          />
        </button>

        <button
          onClick={onToggleDark}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ color: "#64748B" }}
        >
          {darkMode ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <button
          className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-lg border transition-colors"
          style={{ background: "#1E293B", borderColor: "#334155" }}
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}
          >
            R
          </div>
          <span className="text-xs font-medium text-white hidden sm:block">Rachel</span>
          <ChevronDown size={11} style={{ color: "#64748B" }} />
        </button>
      </div>
    </header>
  );
}
