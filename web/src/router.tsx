import { createBrowserRouter } from "react-router";
import { Application } from "./app.tsx";
import { ErrorPage } from "./pages/error.tsx";
import { HomePage } from "./pages/index.tsx";
import { AddContributionPage } from "./pages/add-contribution.tsx";
import { ContributionsPage } from './pages/contributions.tsx'
import { LearnPage } from './pages/learn.tsx';
import {Forum} from "./pages/discussion.tsx";

/*

import { ProtectedRoute } from "./protected-route/protected-route.tsx";
import { DashboardPage } from "./pages/dashboard.tsx";
import ContentUploadPage from "./pages/content-upload.tsx";

import Discussion  from "./pages/forum/post.tsx";
*/

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Application />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "addcontrib",
        element: <AddContributionPage />,
      },
      {
        path: "contributions",
        element: <ContributionsPage />,
      },
      {
        path: "learn",
        element: <LearnPage />,
      },
      
      {
        path: "forum",
        element: <Forum />,
      },
      /*
      {
        path: "forum/:slug",
        element: <Discussion />,
      },
      {
        path: "content-upload",
        element: <ContentUploadPage />,
      },
      {
        element: <ProtectedRoute />, // wrapper for all protected routes
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
        ],
      },
      */
    ],
  },
]);
