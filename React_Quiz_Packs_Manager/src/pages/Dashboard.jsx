import { useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { Button } from "@mui/material";
import { CreatureCanvas } from "../components/CreatureCanvas";

export const Dashboard = () => {
  const logout = useAuthStore((s) => s.logout);

  const [enabled, setEnabled] = useState(true);

  return (
    <div>
      {enabled && <CreatureCanvas />}

      <Button
        onClick={() => setEnabled((prev) => !prev)}
        variant="contained"
        sx={{
          mt: 2,
          mr: 1,
          py: 1.3,
          borderRadius: 2,
          fontWeight: "bold",
          background: "linear-gradient(90deg, #9c27b0, #ba68c8)",
        }}
      >
        {enabled ? "snake off" : "snake on"}
      </Button>

      <Button
        onClick={logout}
        variant="contained"
        sx={{
          mt: 2,
          py: 1.3,
          borderRadius: 2,
          fontWeight: "bold",
          background: "linear-gradient(90deg, #9c27b0, #ba68c8)",
        }}
      >
        Logout
      </Button>
    </div>
  );
};
