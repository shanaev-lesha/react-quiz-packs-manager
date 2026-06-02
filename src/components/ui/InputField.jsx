import { TextField, InputAdornment } from "@mui/material";

export const InputField = ({
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  icon,
}) => (
  <TextField
    fullWidth
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    error={Boolean(error)}
    helperText={error ?? ""}
    InputProps={{
      startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
    }}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        color: "#fff",
        "& input": { padding: "14px" },
        "& fieldset": {
          borderColor: "rgba(156,39,176,0.3)",
        },
        "&:hover fieldset": {
          borderColor: "#9c27b0",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#9c27b0",
        },
      },
    }}
  />
);
