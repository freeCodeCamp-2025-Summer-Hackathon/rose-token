import { createBrowserRouter } from "react-router";
import { Application } from "./app.tsx";
import { ErrorPage } from "./pages/error.tsx";
import { HomePage } from "./pages/index.tsx";
import { ProtectedRoute } from "./protected-route/protected-route.tsx";
import { DashboardPage } from "./pages/dashboard.tsx";

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
				element: <ProtectedRoute />, // wrapper for all protected routes
				children: [
				{
					path: "dashboard",
					element: <DashboardPage />,
				},
				],
			},
		],
	},
]);
