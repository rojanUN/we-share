import Boom from "@hapi/boom";
import { badRequest } from "@hapi/boom";
import { SubmitProblemResponse } from "../interfaces";
import { Validator } from "../middlewares/validation";
import { Request, Response, NextFunction } from "express";
import { Problem } from "leetcode-api-typescript";
import { inputSubmitProblemSchema } from "../validators/submissionValidation";

export class SubmissionController {
  public constructor() {}

  public static async submitProblem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      Validator.check(inputSubmitProblemSchema, req.body);
      const { language, code, slug } = req.body;
      const problem = new Problem(slug);
      await problem.detail();
      const submissionResult: SubmitProblemResponse = await problem.submit(language, code);

      if (!submissionResult.id) throw badRequest("Error submitting problem");

      res.json({ data: submissionResult, message: "Problem submitted successfully" });
    } catch (error: any) {
      if (error instanceof Error) {
        throw Boom.badRequest(error.message);
      } else {
        next(error);
      }
    }
  }

  // public static async getSubmissionDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
  //     try {

  //         const validatedData: ProblemSetKeys = Validator.check(inputGetSubmissionDetailsSchema, req.body);

  //         const { submissionId } = req.body;

  //         const variables: getSubmissionRequestConfig = {
  //             variables: {
  //                 submissionId
  //             },
  //         };

  //         const data: ProblemsetQuestionListResponse = await fetchProblemDetails(variables);
  //         if (data.total === 0) {
  //             throw badRequest("No problems found");
  //         }

  //         res.json({ data, message: "Problems fetched successfully" });
  //     } catch (error) {
  //         next(error);
  //     }
  // }
}
