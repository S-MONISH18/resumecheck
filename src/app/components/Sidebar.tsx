import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, Search, Brain, BarChart3, FileText,
  Settings, ChevronLeft, ChevronRight, Sparkles, Users
} from "lucide-react";

type Screen = "dashboard" | "ranking" | "profile" | "processing" | "analytics" | "comparison";

const NAV_ITEMS: { id: Screen | string; label: string; icon: React.ElementType; badge?: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "search", label: "Candidate Search", icon: Search },
  { id: "ranking", label: "AI Ranking", icon: Brain, badge: "5" },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "comparison", label: "Comparison", icon: Users },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Sidebar({ collapsed, onToggle, activeScreen, onNavigate }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex-none flex flex-col border-r overflow-hidden"
      style={{
        background: "#0F172A",
        borderColor: "#334155",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div className="flex items-center h-14 px-4 border-b shrink-0" style={{ borderColor: "#334155" }}>
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            <Sparkles size={14} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="font-bold text-sm text-white whitespace-nowrap"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                TalentGraph AI
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          const navigable = ["dashboard", "ranking", "analytics", "comparison"].includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => navigable && onNavigate(item.id as Screen)}
              title={collapsed ? item.label : undefined}
              className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg transition-all group relative"
              style={{
                background: isActive ? "rgba(37,99,235,0.15)" : "transparent",
                color: isActive ? "#38BDF8" : "#94A3B8",
              }}
            >
              <Icon
                size={17}
                className="shrink-0 transition-colors"
                style={{ color: isActive ? "#38BDF8" : "#64748B" }}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.18 }}
                    className="text-sm font-medium whitespace-nowrap flex-1 text-left"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!collapsed && item.badge && (
                <span
                  className="text-xs font-semibold px-1.5 py-0.5 rounded-full shrink-0"
                  style={{ background: "rgba(37,99,235,0.2)", color: "#60A5FA" }}
                >
                  {item.badge}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
                  style={{ background: "#2563EB" }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-[56px] w-6 h-6 rounded-full border flex items-center justify-center z-10 transition-colors"
        style={{
          background: "#0F172A",
          borderColor: "#334155",
          color: "#64748B",
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Footer */}
      <div className="p-3 border-t shrink-0" style={{ borderColor: "#334155" }}>
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }}
          >
            R
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0"
              >
                <p className="text-xs font-medium text-white truncate">Rachel Kim</p>
                <p className="text-xs truncate" style={{ color: "#64748B" }}>Senior Recruiter</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
