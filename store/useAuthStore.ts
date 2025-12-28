import { create } from "zustand";

interface User {
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  image?: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
