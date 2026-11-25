import { beforeEach, describe, expect, it, vi } from "vitest";

const verifyMock = vi.fn();

vi.mock("jsonwebtoken", () => ({
  default: {
    verify: (...args: unknown[]) => verifyMock(...args),
  },
}));

import verifyToken from "./guard";

function mockRes() {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("verifyToken", () => {
  beforeEach(() => {
    verifyMock.mockReset();
    process.env.JWT_SECRET_KEY = "test-secret";
  });

  it("returns 401 when authorization header is missing", () => {
    const req: any = { headers: {} };
    const res = mockRes();
    const next = vi.fn();

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  it("attaches decoded user and calls next for a valid token", () => {
    verifyMock.mockImplementation((_token, _secret, cb) => {
      cb(null, { id: 7, role: "ADMIN" });
    });

    const req: any = { headers: { authorization: "Bearer good.token" } };
    const res = mockRes();
    const next = vi.fn();

    verifyToken(req, res, next);

    expect(req.user).toEqual({ id: 7, role: "ADMIN" });
    expect(next).toHaveBeenCalledOnce();
  });

  it("throws boom conflict for an invalid token", () => {
    verifyMock.mockImplementation((_token, _secret, cb) => {
      cb(new Error("jwt malformed"), null);
    });

    const req: any = { headers: { authorization: "Bearer bad" } };
    const res = mockRes();
    const next = vi.fn();

    expect(() => verifyToken(req, res, next)).toThrow(/Invalid token/);
  });
});
