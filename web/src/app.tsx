import { useEffect } from "react";
import { Outlet } from "react-router";
import { useAuthStore } from "./stores/auth-store";

export const Application = () => {
	const { login, logout, setIsLoading } = useAuthStore();

	const checkAuthorization = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/me", { credentials: "include" });
			if (response.ok) {
				const userData = await response.json();
				login(userData);
			} else {
				let errorMessage = "Unauthorized";
				if (response.status === 404) {
					errorMessage = "User not found";
				}
				alert(errorMessage);
				logout();
			}
		} catch (error) {
			console.log("error", error);
			logout();
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		checkAuthorization();
	}, []);
	return <Outlet />;
};
