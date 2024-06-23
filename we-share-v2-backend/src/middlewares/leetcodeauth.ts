import { NextFunction, Request, Response } from "express";
import Leetcode, { EndPoint } from "leetcode-api-typescript";
import Boom from "@hapi/boom";


export async function leetCodeAuthCheck(req: Request, res: Response, next: NextFunction) {
    try {
        await Leetcode.build(EndPoint.US, {
            cookie: process.env.LEETCODE_COOKIE,
        });
        next();
    }
    catch (error) {
        throw Boom.unauthorized("Auth Failed Leetcode", "", {
            message: "AUTH FAILED"
        });
    }
}

