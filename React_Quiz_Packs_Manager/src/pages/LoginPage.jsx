import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import { useAuthForm } from "../hooks/useAuthForm";

import { Typography, Button, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import { AuthLayout } from "../components/AuthLayout";
import { AuthCard } from "../components/AuthCard";
import { InputField } from "../components/ui/InputField";

export const LoginPage = () => {
  const navigate = useNavigate();

  const loginStore = useAuthStore((state) => state.login);

  const {
    email,
    password,
    setEmail,
    setPassword,
    emailError,
    passwordError,
    validate,
    resetErrors,
  } = useAuthForm();

  const [serverError, setServerError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setServerError(null);

    try {
      const data = await login(email, password);
      loginStore(data);
      navigate("/");
    } catch (err) {
      setServerError(err?.message || "Ошибка входа");
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 1,
          }}
        >
          Login
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            mb: 3,
            color: "text.secondary",
          }}
        >
          Welcome back
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <InputField
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                resetErrors();
              }}
              error={emailError}
              icon={<EmailIcon sx={{ color: "#9c27b0" }} />}
            />

            <InputField
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                resetErrors();
              }}
              error={passwordError}
              icon={<LockIcon sx={{ color: "#9c27b0" }} />}
            />

            <Button
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
              LOGIN
            </Button>
          </Box>
        </form>

        {serverError && (
          <Typography sx={{ mt: 2 }} color="error">
            {serverError}
          </Typography>
        )}

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            mt: 3,
          }}
        >
          Don’t have an account?{" "}
          <span
            style={{
              color: "#9c27b0",
              cursor: "pointer",
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </Typography>
      </AuthCard>
    </AuthLayout>
  );
};
