import Boom from "@hapi/boom";
import { AuthenticatedRequest, multipleProblemInterfaceOutput, singleProblemInterfaceOutput } from "@src/interfaces";
import { Request, Response } from "express";
import { Problem } from "leetcode-api-typescript";

export class ProblemController {
  public constructor() {}

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

  public static async handleProblemSubmit(req: Request, res: Response): Promise<void> {
    try {
      const { slug, code, language } = req.body;
      console.log(slug, code, language, "slug, code, language >>>>");

      res.json({ message: "Problem submitted successfully", slug: slug, language });
    } catch (error) {
      throw Boom.badRequest("Error submitting problem");
    }
  }

  public static async multipleProblem(req: Request, res: Response): Promise<void> {
    try {
      const leetCodeAuth = (req as unknown as AuthenticatedRequest).leetcode;

      if (!leetCodeAuth) {
        throw Boom.unauthorized("LeetCode authentication is required");
      }

      const problems = await leetCodeAuth.getAllProblems();

      const response: multipleProblemInterfaceOutput[] = problems.map((problem: Problem) => ({
        id: problem.id,
        title: problem.title,
        difficulty: problem.difficulty,
      }));

      res.json({ data: response, message: "Problems fetched successfully" });
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  }
}
