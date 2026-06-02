import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login, register } from "../api/authApi";
import { useAuthStore } from "../store/auth.store";
import { useAuthForm } from "../hooks/useAuthForm";

import { AuthForm } from "../components/AuthForm";

export const AuthPage = ({ mode }) => {
  const navigate = useNavigate();
  const loginStore = useAuthStore((s) => s.login);

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

    try {
      const data = isLogin
        ? await login(email, password)
        : await register(email, password);

      loginStore(data);
      navigate("/");
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <AuthForm
      isLogin={isLogin}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      emailError={emailError}
      passwordError={passwordError}
      clearEmailError={clearEmailError}
      clearPasswordError={clearPasswordError}
      onSubmit={handleSubmit}
      serverError={serverError}
      onSwitchMode={() => navigate(isLogin ? "/register" : "/login")}
    />
  );
};
