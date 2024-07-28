import { Request, Response, NextFunction } from "express";
import MCQQuestion from "../models/mcqQuestionsModel";
import { CodeQuestionResponse, MCQQuestionResponse } from "../interfaces/questionInterface";
import CodeQuestion from "../models/codeQuestionsModel";
import { Sequelize, Op } from "sequelize";

export class QuestionController {
  public constructor() { }

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
      const { questions } = req.body;
      console.log(questions);

      const createdQuestions = await CodeQuestion.bulkCreate(questions);
      console.log(createdQuestions);
      const data = createdQuestions.map((question) => question.get());
      console.log(data);
      res.json({ data, message: "Code questions added successfully" });
    } catch (error) {
      next(error);
    }
  }

  public static async getRandomMCQQuestion() {
    const mcqQuestions = await MCQQuestion.findAll({ order: [Sequelize.fn("RANDOM")], limit: 25 });
    return mcqQuestions;
  }

  public static async getRandomEasyCodeQuestion() {
    const codeQuestions = await CodeQuestion.findAll({
      where: { difficulty: "EASY" },
      order: [Sequelize.fn("RANDOM")],
      limit: 1,
    });
    return codeQuestions;
  }


  public static async getRandomMediumOrHardCodeQuestion() {
    const codeQuestions = await CodeQuestion.findAll({
      where: {
        [Op.or]: [
          { difficulty: "MEDIUM" },
          { difficulty: "HARD" },
        ],
      },
      order: [Sequelize.fn("RANDOM")],
      limit: 1,
    });
    return codeQuestions;
  }
  public static async getRandomQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const randomMCQQuestions = await QuestionController.getRandomMCQQuestion();
      const randomEasyCodeQuestions = await QuestionController.getRandomEasyCodeQuestion();
      const randomMediumHardCodeQuestions = await QuestionController.getRandomMediumOrHardCodeQuestion();
      const questionCollection = [...randomMCQQuestions, ...randomEasyCodeQuestions, ...randomMediumHardCodeQuestions];
      res.json({ questionCollection, message: "Questions fetched successfully" });
    } catch (error) {
      next(error);
    }
  }
}
