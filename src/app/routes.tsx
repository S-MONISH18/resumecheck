import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Processing } from "./pages/Processing";
import { RankingResults } from "./pages/RankingResults";
import { CandidateProfile } from "./pages/CandidateProfile";
import { Analytics } from "./pages/Analytics";
import { Compare } from "./pages/Compare";
import { Explainability } from "./pages/Explainability";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { authStore } from "./auth";

function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!authStore.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: () => (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      { index: true, Component: Dashboard },
      { path: "ranking/process", Component: Processing },
      { path: "ranking/:jobId/results", Component: RankingResults },
      { path: "candidates/:id", Component: CandidateProfile },
      { path: "candidates/:id/explainability", Component: Explainability },
      { path: "analytics", Component: Analytics },
      { path: "compare", Component: Compare },
      { path: "settings", Component: Settings },
      { path: "*", Component: () => <div className="text-foreground p-8 text-center">Page not found.</div> }
    ]
  }
]);
