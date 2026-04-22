import { api } from "../api";
import { useAuthStore } from "../store/auth.store";

export const getMe = () => {
  const token = useAuthStore.getState().token;

  return api("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const login = (email, password) =>
  api("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const register = (email, password) => {
  return api("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};
