import { create } from "zustand";

//--------------type for User
export type User = { name: string; email: string } | null;

// ---------------interface for Auth Store
interface AuthState {
	user: User;
	setUser: (userData: User) => void;

	isAuthenticated: boolean;
	setIsAuthenticated: (isAuthenticated: boolean) => void;

	login: (userData: User) => void;
	logout: () => void;

	isLoading: boolean;
	setIsLoading: (isLoadingValue: boolean) => void;
}
// --------------- Auth Store

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	setUser: (userData) => set({ user: userData }),

	isAuthenticated: false,
	setIsAuthenticated: (isAuthenticated) =>
		set({ isAuthenticated: isAuthenticated }),

	login: (userData: User) => {
		set({ user: userData, isAuthenticated: true }); // adding user data into store
	},
	logout: () => {
		set({ user: null, isAuthenticated: false }); // removing stored user data
	},

	isLoading: false,
	setIsLoading: (isLoadingValue: boolean) => set({ isLoading: isLoadingValue }),
}));
