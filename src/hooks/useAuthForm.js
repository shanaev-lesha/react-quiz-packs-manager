import { useState } from "react";
import { validateEmail, validatePassword } from "../shared/lib/validation";

export const useAuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validate = (mode) => {
    const emailErr = validateEmail(email);

    let passwordErr = null;

    if (mode === "register") {
      passwordErr = validatePassword(password);
    } else {
      if (!password) {
        passwordErr = "Пароль обязателен";
      }
    }

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    return !emailErr && !passwordErr;
  };

  const clearEmailError = () => setEmailError(null);
  const clearPasswordError = () => setPasswordError(null);

  return {
    email,
    password,
    setEmail,
    setPassword,
    emailError,
    passwordError,
    validate,
    clearEmailError,
    clearPasswordError,
  };
};
