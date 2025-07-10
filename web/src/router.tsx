import { createBrowserRouter } from "react-router";
import { Application } from "./app.tsx";
import { ErrorPage } from "./pages/error.tsx";
import { Entry } from "./pages/home.tsx";
import Map from "./pages/index.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Application />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Map title="LangLantern" description="Get started"/>,
			},
		],
	},
	{
		path: "/login",
		element: <Application />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Entry />,
			},
		],
	},
]);
