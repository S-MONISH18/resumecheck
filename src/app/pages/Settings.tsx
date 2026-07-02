import { useState } from "react";
import { useNavigate } from "react-router";
import {
  User, Mail, Building2, Key, Moon, Sun, LogOut, Save,
  ShieldCheck, Zap, Bell, Trash2, Eye, EyeOff, CheckCircle2
} from "lucide-react";
import { cn } from "../../lib/utils";
import { authStore } from "../auth";
import { stateStore } from "../state";
import { useTheme } from "../components/ThemeProvider";

export function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const user = authStore.getUser();

  // Profile form state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [company, setCompany] = useState("");
  const [saved, setSaved] = useState(false);

  // API Key state
  const [groqKey, setGroqKey] = useState("gsk_E07KNy••••••••••••••••••••••••••lxfqyV");
  const [showKey, setShowKey] = useState(false);
  const [keyUpdated, setKeyUpdated] = useState(false);

  const handleSaveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveKey = () => {
    setKeyUpdated(true);
    setTimeout(() => setKeyUpdated(false), 2000);
  };

  const handleClearData = () => {
    if (window.confirm("This will clear all cached ranking results. Continue?")) {
      stateStore.reset();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    authStore.logout();
    navigate("/login", { replace: true });
  };

  const initials = user?.initials ||
    user?.name?.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase() || "U";

  return (
    <div className="max-w-[760px] mx-auto pb-24">
      {/* Header */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
          ACCOUNT
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Settings</h1>
        <p className="text-[14px] text-muted-foreground">
          Manage your profile, API keys, and preferences.
        </p>
      </div>

      <div className="space-y-6">

        {/* ── Profile Card ── */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Profile</h2>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold text-white">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{user?.email || ""}</p>
              <span className="mt-1 inline-block text-[11px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Free Plan
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full h-10 bg-background border border-border rounded-lg pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                  placeholder="Your name"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-10 bg-background border border-border rounded-lg pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Company
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full h-10 bg-background border border-border rounded-lg pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                  placeholder="Acme Corp"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={handleSaveProfile}
              className={cn(
                "h-9 px-5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all",
                saved
                  ? "bg-emerald-500 text-white"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? "Saved!" : "Save changes"}
            </button>
          </div>
        </div>

        {/* ── AI API Keys ── */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Key className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">AI API Keys</h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                Groq powers real-time resume ranking with llama-3.3-70b
              </p>
            </div>
          </div>

          {/* Groq Key */}
          <div className="rounded-lg border border-border bg-background p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-foreground">Groq API Key</span>
                <span className="text-[11px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                  Active
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground">llama-3.3-70b-versatile</span>
            </div>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={groqKey}
                onChange={e => setGroqKey(e.target.value)}
                className="w-full h-10 bg-card border border-border rounded-lg pl-4 pr-10 text-sm font-mono text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={handleSaveKey}
                className={cn(
                  "h-8 px-4 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all",
                  keyUpdated
                    ? "bg-emerald-500 text-white"
                    : "border border-border hover:bg-muted text-foreground"
                )}
              >
                {keyUpdated ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                {keyUpdated ? "Updated!" : "Update key"}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 text-[12px] text-muted-foreground bg-muted/50 rounded-lg p-3">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            Keys are stored in <code className="font-mono bg-background px-1 rounded">backend/.env</code> and never exposed to the browser. Get free Groq keys at{" "}
            <a href="https://console.groq.com" target="_blank" className="text-primary underline">console.groq.com</a>.
          </div>
        </div>

        {/* ── Appearance ── */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
              <Sun className="w-4 h-4 text-sky-500" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Appearance</h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Theme</p>
              <p className="text-[13px] text-muted-foreground mt-0.5">
                Currently using <span className="font-semibold">{theme === "dark" ? "Dark" : "Light"}</span> mode
              </p>
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 h-9 px-4 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              Switch to {theme === "dark" ? "Light" : "Dark"} mode
            </button>
          </div>
        </div>

        {/* ── Notifications ── */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-purple-500" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: "Ranking complete", desc: "Get notified when AI finishes ranking a batch" },
              { label: "Weekly digest", desc: "Summary of hiring activity every Monday" },
              { label: "Top candidate alerts", desc: "Alert when a candidate scores above 85" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <button
                  className={cn(
                    "w-10 h-6 rounded-full transition-colors relative",
                    i < 2 ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform",
                    i < 2 ? "translate-x-5" : "translate-x-1"
                  )} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Danger Zone ── */}
        <div className="bg-card rounded-xl border border-destructive/30 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Trash2 className="w-4 h-4 text-destructive" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Danger Zone</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Clear ranking data</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  Removes all cached candidate results from localStorage
                </p>
              </div>
              <button
                onClick={handleClearData}
                className="h-9 px-4 border border-destructive/40 hover:bg-destructive/10 rounded-lg text-sm font-medium text-destructive transition-colors"
              >
                Clear data
              </button>
            </div>
            <div className="border-t border-border pt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Sign out</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  Sign out of your TalentGraph account
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="h-9 px-4 border border-border hover:bg-muted rounded-lg text-sm font-medium text-foreground flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
