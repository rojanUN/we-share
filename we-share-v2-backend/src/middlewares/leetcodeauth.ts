import { NextFunction, Request, Response } from "express";
import Leetcode, { EndPoint } from "leetcode-api-typescript";
import Boom from "@hapi/boom";
import { AuthenticatedRequest } from "@src/interfaces";

export async function leetCodeAuthCheck(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await Leetcode.build(EndPoint.US, {
      cookie: process.env.LEETCODE_COOKIE,
    });
    (req as unknown as AuthenticatedRequest).leetcode = response;
    next();
  } catch (error) {
    throw Boom.unauthorized("Auth Failed Leetcode", "", {
      message: "AUTH FAILED",
    });
  }
}
