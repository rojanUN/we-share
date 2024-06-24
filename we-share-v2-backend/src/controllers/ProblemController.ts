import { badRequest } from "@hapi/boom";
import { fetchGraphQLData } from "../helpers";
import {
  GraphQLRequestConfig,
  ProblemSetKeys,
  ProblemsetQuestionListResponse,
  singleProblemInterfaceOutput,
} from "../interfaces";
import { Validator } from "../middlewares/validation";
import { problemSetKeysSchema } from "../validators/problemValidation";
import { Request, Response, NextFunction } from "express";
import { Problem } from "leetcode-api-typescript";

export class ProblemController {
  public constructor() {}

  public static async singleProblem(req: Request, res: Response, next: NextFunction): Promise<void> {
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
      next(error);
    }
  }

  public static async multipleProblem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData: ProblemSetKeys = Validator.check(problemSetKeysSchema, req.body);

      const variables: GraphQLRequestConfig = {
        variables: {
          categorySlug: validatedData.categorySlug,
          limit: validatedData.limit,
          skip: validatedData.skip,
          filters: validatedData.filters,
        },
      };

      const data: ProblemsetQuestionListResponse = await fetchGraphQLData(variables);
      if (data.total === 0) {
        throw badRequest("No problems found");
      }

      res.json({ data, message: "Problems fetched successfully" });
    } catch (error) {
      next(error);
    }
  }
}
