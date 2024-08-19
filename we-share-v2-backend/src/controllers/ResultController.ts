import { NextFunction, Request, Response } from "express";
import { Op, Sequelize } from "sequelize";

export class ResultController {
  public constructor() {}

  public static async handleResultEvaluation(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      res.status(200).json({ message: "Result evaluated successfully" });
    } catch (error) {
      next(error);
    }
  }
}
