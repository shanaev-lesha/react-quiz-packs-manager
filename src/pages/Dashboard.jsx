import { useAuthStore } from "../store/auth.store";
import { Button } from "@mui/material";
import { SnakeToggle } from "../components/SnakeToggle";
import { buttonStyle } from "../components/ui/buttonStyle.js";
import { Box } from "@mui/material";

export const Dashboard = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <Box sx={{ display: "flex", gap: "2mm" }}>
      <SnakeToggle />

      <Button onClick={logout} variant="contained" sx={buttonStyle}>
        Logout
      </Button>
    </Box>
  );
};
