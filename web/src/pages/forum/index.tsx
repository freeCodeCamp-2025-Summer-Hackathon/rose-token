import { createBrowserRouter } from "react-router";
import { Discussion } from "./post";

export const routerForum = createBrowserRouter([
    {
        path: "/posts/:slug",
        element: <Discussion/>
    },
]);
