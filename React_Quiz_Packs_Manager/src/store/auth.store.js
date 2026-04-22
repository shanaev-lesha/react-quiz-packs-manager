import { create } from "zustand";
import { getMe } from "../services/auth.service";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: true,

  fetchUser: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ token: null, isLoading: false });
      return;
    }

    set({ token });

    try {
      const data = await getMe();

      set({
        user: data.user,
        isLoading: false,
      });
    } catch {
      localStorage.removeItem("token");

      set({
        token: null,
        user: null,
        isLoading: false,
      });
    }
  },

  login: (data) => {
    localStorage.setItem("token", data.token);

    set({
      token: data.token,
      user: data.user,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      token: null,
      user: null,
    });
  },
}));
