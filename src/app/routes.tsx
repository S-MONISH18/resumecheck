import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Processing } from "./pages/Processing";
import { RankingResults } from "./pages/RankingResults";
import { CandidateProfile } from "./pages/CandidateProfile";
import { Analytics } from "./pages/Analytics";
import { Compare } from "./pages/Compare";
import { Explainability } from "./pages/Explainability";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "ranking/process", Component: Processing },
      { path: "ranking/:jobId/results", Component: RankingResults },
      { path: "candidates/:id", Component: CandidateProfile },
      { path: "candidates/:id/explainability", Component: Explainability },
      { path: "analytics", Component: Analytics },
      { path: "compare", Component: Compare },
      { path: "*", Component: () => <div>Not Found</div> }
    ]
  }
]);
