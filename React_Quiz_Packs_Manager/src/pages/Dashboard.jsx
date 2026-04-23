import { useAuthStore } from "../store/auth.store";
import { Button } from "@mui/material";

export const Dashboard = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <div>
      <h1>Dashboard</h1>
      <Button
        onClick={logout}
        type="submit"
        variant="contained"
        sx={{
          mt: 1,
          py: 1.3,
          borderRadius: 2,
          fontWeight: "bold",
          background: "linear-gradient(90deg, #9c27b0, #ba68c8)",
          boxShadow: "0 0 20px rgba(156,39,176,0.5)",
          "&:hover": {
            boxShadow: "0 0 30px rgba(156,39,176,0.8)",
          },
        }}
      >
        Logout
      </Button>
    </div>
  );
};
