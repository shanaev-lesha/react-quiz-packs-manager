import { describe, it, expect, vi } from "vitest";
import { api } from "../shared/api";

describe("api", () => {
  it("returns data on success", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: "ok" }),
      }),
    );

    const res = await api("/test");

    expect(res).toEqual({ data: "ok" });
  });

  it("throws error on fail", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "fail" }),
      }),
    );

    await expect(api("/test")).rejects.toThrow("fail");
  });
});
