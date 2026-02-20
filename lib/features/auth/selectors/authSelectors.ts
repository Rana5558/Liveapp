import { RootState } from "@/lib/store";

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;
