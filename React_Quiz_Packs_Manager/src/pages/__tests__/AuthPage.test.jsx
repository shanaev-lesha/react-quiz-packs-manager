import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthPage } from "../AuthPage";
import userEvent from "@testing-library/user-event";

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
  it("shows validation errors", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <AuthPage mode="login" />
      </BrowserRouter>,
    );

    await user.click(screen.getByRole("button"));

    expect(await screen.findByText(/email/i)).toBeInTheDocument();
  });

  it("updates input fields", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <AuthPage mode="login" />
      </BrowserRouter>,
    );

    const emailInput = screen.getByPlaceholderText(/email/i);

    await user.type(emailInput, "test@test.com");

    expect(emailInput).toHaveValue("test@test.com");
  });
});
