import { api } from "../shared/api";

export const getMe = (token) => {
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

export const register = (email, password) =>
  api("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
