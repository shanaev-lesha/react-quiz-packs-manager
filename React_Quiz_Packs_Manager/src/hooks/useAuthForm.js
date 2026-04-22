import { useState } from "react";
import { validateEmail, validatePassword } from "../utils/validation";

export const useAuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validate = () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    return !emailErr && !passwordErr;
  };

  const resetErrors = () => {
    setEmailError(null);
    setPasswordError(null);
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    emailError,
    passwordError,
    validate,
    resetErrors,
  };
};
