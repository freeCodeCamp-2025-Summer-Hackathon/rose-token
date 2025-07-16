import { create } from "zustand";

export type User = { name: string; email: string } | null;


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


export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	setUser: (userData) => set({ user: userData }),

	isAuthenticated: false,
	setIsAuthenticated: (isAuthenticated) =>
		set({ isAuthenticated: isAuthenticated }),

	login: (userData: User) => {
		set({ user: userData, isAuthenticated: true }); 
	},
	logout: () => {
		set({ user: null, isAuthenticated: false }); 
	},

	isLoading: false,
	setIsLoading: (isLoadingValue: boolean) => set({ isLoading: isLoadingValue }),
}));
