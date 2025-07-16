import { useEffect } from "react";
import { Outlet } from "react-router";
import { checkAuthorization } from "./utils/checkAuth";

export const Application = () => {
	
	useEffect(() => {
		checkAuthorization();
	}, []);
	
	return <Outlet />;
};
