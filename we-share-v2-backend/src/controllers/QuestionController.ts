import { Request, Response, NextFunction } from "express";
import MCQQuestion from "../models/mcqQuestionsModel";
import { CodeQuestionResponse, MCQQuestionResponse } from "../interfaces/questionInterface";
import CodeQuestion from "../models/codeQuestionsModel";

export class QuestionController {
  public constructor() {}

  public static async addMcqQuestions(req: Request, res: Response, next: NextFunction) {
    try {
      const { questions } = req.body;
      console.log(questions);

      const createdQuestions = await MCQQuestion.bulkCreate(questions);
      console.log(createdQuestions);
      const data = createdQuestions.map((question) => question.get());
      console.log(data);
      res.json({ data, message: "MCQ questions added successfully" });
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
