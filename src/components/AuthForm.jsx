import { Typography, Button, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import { AuthLayout } from "./AuthLayout";
import { AuthCard } from "./AuthCard";
import { InputField } from "./ui/InputField";
import { buttonStyle } from "./ui/buttonStyle.js";

export const AuthForm = ({
  isLogin,
  email,
  password,
  setEmail,
  setPassword,
  emailError,
  passwordError,
  clearEmailError,
  clearPasswordError,
  onSubmit,
  serverError,
  onSwitchMode,
}) => {
  return (
    <AuthLayout>
      <AuthCard>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}
        >
          {isLogin ? "Login" : "Register"}
        </Typography>

        <Typography variant="body2" sx={{ textAlign: "center", mb: 3 }}>
          {isLogin ? "Welcome back" : "Create your account"}
        </Typography>

        <form onSubmit={onSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <InputField
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearEmailError();
              }}
              error={emailError}
              icon={<EmailIcon />}
            />

            <InputField
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearPasswordError();
              }}
              error={passwordError}
              icon={<LockIcon />}
            />

            <Button type="submit" variant="contained" sx={buttonStyle}>
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
          </Box>
        </form>

        {serverError && (
          <Typography sx={{ mt: 2 }} color="error">
            {serverError}
          </Typography>
        )}

        <Typography sx={{ textAlign: "center", mt: 3 }}>
          <span onClick={onSwitchMode} style={{ cursor: "pointer" }}>
            {isLogin ? "Register" : "Login"}
          </span>
        </Typography>
      </AuthCard>
    </AuthLayout>
  );
};
