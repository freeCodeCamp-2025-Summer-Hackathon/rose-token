import { createBrowserRouter } from "react-router";
import { Application } from "./app.tsx";
import { ErrorPage } from "./pages/error.tsx";
import { HomePage } from "./pages/index.tsx";
import Discussion  from "./pages/forum/post.tsx";
import Forum from "./pages/forum/index.tsx";
export const router = createBrowserRouter([
	{
		path: "/",
		element: <Application />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			}
		],
	},
	{
		path: "/forum",
		element: <Forum />,
	},
	{
		path: "/forum/posts/:slug",
		element: <Discussion />,
	}
	
]);
