import { NextFunction, Request, Response } from "express";
import Leetcode, { EndPoint, Problem } from "leetcode-api-typescript";

export class ProblemController {
    public constructor() { }

    public static async singleProblem(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { slug } = req.body;
            await Leetcode.build(EndPoint.US, {

                cookie: process.env.LEETCODE_COOKIE,
            }).catch((err) => console.log("this is error", err));
            const problems = new Problem(slug);

            // Fetch problem details
            await problems.detail();

            // Construct the response
            const response = {
                content: problems.content,
                testCase: problems.sampleTestCase,
                codeSnippets: problems.codeSnippets,
            };

            res.json({ data: response, message: "Problem fetched successfully" });
        } catch (error) {
            next(error);
        }
    }
}
