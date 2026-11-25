import { describe, expect, it, vi } from "vitest";
import { exceptionHandler } from "./exceptionHandler";

describe("exceptionHandler", () => {
  it("forwards successful async middleware", async () => {
    const fn = vi.fn(async () => undefined);
    const req = {} as any;
    const res = {} as any;
    const next = vi.fn();

    await exceptionHandler(fn)(req, res, next);

    expect(fn).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it("passes rejected errors to next", async () => {
    const error = new Error("fail");
    const fn = vi.fn(async () => {
      throw error;
    });
    const next = vi.fn();

    await exceptionHandler(fn)({} as any, {} as any, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
