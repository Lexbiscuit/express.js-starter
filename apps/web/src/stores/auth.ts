import {create} from "zustand";

const initialState = {
  name: "",
  id: -1,
  isAuthenticated: false,
  isLoading: false,
  isInitializing: true,
};

type AuthState = typeof initialState;

type AuthStore = AuthState & {
  setAuth: (authState: AuthState) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsInitializing: (isInitializing: boolean) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  ...initialState,
  setAuth: (authState) => set(() => ({...authState})),
  setIsLoading: (isLoading) => set((s) => ({...s, isLoading})),
  setIsInitializing: (isInitializing) => set((s) => ({...s, isInitializing})),
  reset: () => set(initialState),
}));
