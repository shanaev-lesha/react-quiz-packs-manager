import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import { useAuthForm } from "../hooks/useAuthForm";

import { Typography, Button, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import { AuthLayout } from "../components/AuthLayout";
import { AuthCard } from "../components/AuthCard";
import { InputField } from "../components/ui/InputField";

export const AuthPage = ({ mode }) => {
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);

  const isLogin = mode === "login";

  const {
    email,
    password,
    setEmail,
    setPassword,
    emailError,
    passwordError,
    validate,
    clearEmailError,
    clearPasswordError,
  } = useAuthForm();

  const [serverError, setServerError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setServerError(null);

    try {
      const data = isLogin
        ? await login(email, password)
        : await register(email, password);

      loginStore(data);
      navigate("/");
    } catch (err) {
      setServerError(
        err?.message || (isLogin ? "Ошибка входа" : "Ошибка регистрации"),
      );
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}
        >
          {isLogin ? "Login" : "Register"}
        </Typography>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", mb: 3, color: "text.secondary" }}
        >
          {isLogin ? "Welcome back" : "Create your account to get started"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <InputField
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearEmailError();
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
                clearPasswordError();
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
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
          </Box>
        </form>

        {serverError && (
          <Typography sx={{ mt: 2 }} color="error">
            {serverError}
          </Typography>
        )}

        <Typography variant="body2" sx={{ textAlign: "center", mt: 3 }}>
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            style={{ color: "#9c27b0", cursor: "pointer" }}
            onClick={() => navigate(isLogin ? "/register" : "/login")}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </Typography>
      </AuthCard>
    </AuthLayout>
  );
};
