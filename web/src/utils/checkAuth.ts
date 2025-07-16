import { useAuthStore } from "@/stores/auth-store";



	export const checkAuthorization = async () => {
        const { login, logout, setIsLoading } = useAuthStore();
		setIsLoading(true);
		try {
			// const response = await fetch("/me", { credentials: "include" });
			// if (response.ok) {
			// 	const userData = await response.json();
			// 	login(userData);
			// } else {
			// 	let errorMessage = "Unauthorized";
			// 	if (response.status === 404) {
			// 		errorMessage = "User not found";
			// 	}
			// 	alert(errorMessage);
			// 	logout();
			// }

           const mockUser = {
	id: "mock-123",
	name: "Dev User",
	email: "devuser@example.com",
	role: "admin",
	token: "fake-token-123",
};

login(mockUser);

		} catch (error) {
			console.log("error", error);
			logout();
		} finally {
			setIsLoading(false);
		}
	};