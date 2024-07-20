import { Request, Response, NextFunction } from "express";
import MCQQuestion from "../models/mcqQuestionsModel";
import { CodeQuestionResponse, MCQQuestionResponse } from "../interfaces/questionInterface";
import CodeQuestion from "../models/codeQuestionsModel";

export class QuestionController {
  public constructor() {}

  public static async addMcqQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const { question, options, correctAnswer, category } = req.body;

      const { dataValues } = await MCQQuestion.create({
        question,
        options,
        correctAnswer,
        category,
      });
      const data: MCQQuestionResponse = dataValues;
      res.json({ data, message: "MCQ question added successfully" });
    } catch (error) {
      next(error);
    }
  }

  public static async addCodeQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const { question, category } = req.body;

      const { dataValues } = await CodeQuestion.create({
        question,
        category,
      });
      const data: CodeQuestionResponse = dataValues;
      res.json({ data, message: "Code question added successfully" });
    } catch (error) {
      next(error);
    }
  }
}
