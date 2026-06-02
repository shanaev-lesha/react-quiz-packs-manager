import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) return null;

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};
