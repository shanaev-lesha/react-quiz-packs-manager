import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "../auth.store";

describe("auth store", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isLoading: false,
    });
    localStorage.clear();
  });

  it("login sets token and user", () => {
    const data = {
      token: "123",
      user: { id: 1, email: "test@test.com" },
    };

    useAuthStore.getState().login(data);

    const state = useAuthStore.getState();

    expect(state.token).toBe("123");
    expect(state.user.email).toBe("test@test.com");
  });

  it("logout clears state", () => {
    useAuthStore.setState({
      token: "123",
      user: { id: 1 },
    });

    useAuthStore.getState().logout();

    const state = useAuthStore.getState();

    expect(state.token).toBe(null);
    expect(state.user).toBe(null);
  });
});
