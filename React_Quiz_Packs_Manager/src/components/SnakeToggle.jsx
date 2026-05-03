import { useState } from "react";
import { Button } from "@mui/material";
import { CreatureCanvas } from "./CreatureCanvas";
import { buttonStyle } from "./ui/buttonStyle.js";

export const SnakeToggle = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      {enabled && <CreatureCanvas />}

      <Button
        onClick={() => setEnabled((prev) => !prev)}
        variant="contained"
        sx={buttonStyle}
      >
        {enabled ? "snake off" : "snake on"}
      </Button>
    </>
  );
};
