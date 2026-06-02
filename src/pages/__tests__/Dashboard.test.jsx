import { render, screen } from "@testing-library/react";
import { Dashboard } from "../Dashboard";

describe("Dashboard", () => {
  it("renders dashboard", () => {
    render(<Dashboard />);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});
