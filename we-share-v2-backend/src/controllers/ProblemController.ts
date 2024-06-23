import Boom from "@hapi/boom";
import { singleProblemInterfaceOutput } from "@src/interfaces";
import { Request, Response } from "express";
import { Problem, ProblemStatus } from "leetcode-api-typescript";
import Leetcode from "leetcode-api-typescript";

export class ProblemController {
  public constructor() { }

  public static async singleProblem(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.body;

      const problems = new Problem(slug);

      await problems.detail();

      const response: singleProblemInterfaceOutput = {
        id: problems.id,
        content: problems.content,
        testCase: problems.sampleTestCase,
        codeSnippets: problems.codeSnippets,
      };

      res.json({ data: response, message: "Problem fetched successfully" });
    } catch (error) {
      throw Boom.badRequest("Error fetching problems");
    }
  }

}
