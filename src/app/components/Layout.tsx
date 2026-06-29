import { Outlet, NavLink } from "react-router";
import { 
  LayoutDashboard, Search, Sparkles, BarChart3, FileText, Settings, 
  ChevronLeft, Bell, Search as SearchIcon, Sun, Moon
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid h-screen overflow-hidden" 
         style={{ gridTemplateColumns: `${collapsed ? '72px' : '256px'} 1fr`, gridTemplateRows: '64px 1fr' }}>
      
      {/* Sidebar */}
      <aside className="row-span-2 flex flex-col bg-surface border-r border-border transition-all duration-250 z-20">
        <div className="h-[64px] flex items-center px-5 border-b border-border shrink-0">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground text-xs font-bold font-mono">T</span>
          </div>
          {!collapsed && <span className="ml-3 font-semibold text-foreground truncate">TalentGraph AI</span>}
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {!collapsed && <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mt-4 mb-2 px-2">Main</div>}
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" collapsed={collapsed} />
          <NavItem to="/ranking/process" icon={Sparkles} label="AI Processing" collapsed={collapsed} />
          <NavItem to="/ranking/123/results" icon={Search} label="Ranking Results" collapsed={collapsed} />
          
          {!collapsed && <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mt-6 mb-2 px-2">Insights</div>}
          <NavItem to="/analytics" icon={BarChart3} label="Analytics" collapsed={collapsed} />
          <NavItem to="/compare" icon={FileText} label="Compare" collapsed={collapsed} />
          
          {!collapsed && <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mt-6 mb-2 px-2">Settings</div>}
          <NavItem to="/settings" icon={Settings} label="Settings" collapsed={collapsed} />
        </nav>

        <div className="p-3 border-t border-border relative shrink-0">
          {!collapsed && (
            <div className="bg-primary/10 rounded-lg p-3 mb-3">
              <p className="text-xs text-primary font-medium">Upgrade to Pro</p>
              <p className="text-[11px] text-primary/70 mt-0.5">Unlock unlimited candidates</p>
            </div>
          )}
          <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "px-2")}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary shrink-0 flex items-center justify-center text-xs font-medium text-white">
              SC
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Sarah Chen</p>
                <p className="text-xs text-muted-foreground truncate">Free Plan</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground shadow-md z-30"
          >
            <ChevronLeft className={cn("w-3 h-3 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>
      </aside>

      {/* Header */}
      <header className="flex items-center justify-between px-10 bg-surface border-b border-border z-10">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>TalentGraph AI</span>
          <span className="mx-2">/</span>
          <span className="text-primary font-medium">Current Page</span>
        </div>
        
        <div className="flex items-center justify-center flex-1 max-w-[480px] px-8">
          <div className="relative w-full max-w-[320px] focus-within:max-w-full transition-all">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search candidates, jobs, skills... ⌘K" 
              className="w-full h-9 bg-card border border-border rounded-lg pl-9 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button className="h-8 px-4 bg-transparent border border-border hover:bg-muted rounded-lg text-sm font-medium text-foreground transition-colors">
            Upload Resumes
          </button>
          <button className="relative p-1.5 text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border border-surface" />
          </button>
          <div className="w-px h-5 bg-border mx-1" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-medium text-white cursor-pointer">
            SC
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="overflow-y-auto bg-background p-10 pb-16 relative">
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({ to, icon: Icon, label, collapsed }: { to: string, icon: any, label: string, collapsed: boolean }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => cn(
        "flex items-center h-10 px-3 rounded-lg transition-all duration-150 group",
        isActive 
          ? "bg-primary/15 text-primary shadow-[inset_3px_0_0_#2563EB]" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
      title={collapsed ? label : undefined}
    >
      <Icon className="w-[18px] h-[18px] shrink-0" />
      {!collapsed && <span className="ml-3 text-sm font-medium truncate">{label}</span>}
    </NavLink>
  );
}
