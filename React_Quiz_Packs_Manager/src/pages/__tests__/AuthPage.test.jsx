import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthPage } from "../AuthPage";

describe("AuthPage (login)", () => {
  it("renders login form", () => {
    render(
      <BrowserRouter>
        <AuthPage mode="login" />
      </BrowserRouter>,
    );

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your email/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your password/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
