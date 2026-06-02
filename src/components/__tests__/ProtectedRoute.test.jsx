import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";
import { useAuthStore } from "../../store/auth.store";

describe("ProtectedRoute", () => {
  it("redirects if no token", () => {
    useAuthStore.setState({ token: null, isLoading: false });

    const { container } = render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Private</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(container.innerHTML).not.toContain("Private");
  });

  it("renders children if token exists", () => {
    useAuthStore.setState({ token: "123", isLoading: false });

    const { getByText } = render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Private</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(getByText("Private")).toBeInTheDocument();
  });
});
