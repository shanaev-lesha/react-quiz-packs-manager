import { describe, it, expect } from "vitest";
import { validateEmail, validatePassword } from "../validation";

describe("validateEmail", () => {
  it("returns error if empty", () => {
    expect(validateEmail("")).toBeTruthy();
  });

  it("returns error if invalid", () => {
    expect(validateEmail("123")).toBeTruthy();
  });

  it("returns null if valid", () => {
    expect(validateEmail("test@test.com")).toBe(null);
  });
});

describe("validatePassword", () => {
  it("fails on empty", () => {
    expect(validatePassword("")).toBeTruthy();
  });

  it("fails on short", () => {
    expect(validatePassword("a1")).toBeTruthy();
  });

  it("fails without number", () => {
    expect(validatePassword("abcd")).toBeTruthy();
  });

  it("fails without letter", () => {
    expect(validatePassword("1234")).toBeTruthy();
  });

  it("passes valid password", () => {
    expect(validatePassword("test123")).toBe(null);
  });
});
