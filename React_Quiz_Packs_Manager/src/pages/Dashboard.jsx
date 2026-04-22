import { useAuthStore } from "../store/auth.store";

export const Dashboard = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
