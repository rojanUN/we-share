import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import { conflict } from "@hapi/boom";
import generator from "generate-password";

export class UserController {
  public constructor() {}

  public static async addUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email } = req.body;

      const isUserExisted = await User.findOne({ where: { email } });

      if (isUserExisted) {
        throw conflict("User already exists!");
      }

      const password = generator.generate({
        length: 10,
        numbers: true,
      });
      const examId = generator.generate({
        length: 5,
        numbers: true,
      });
      console.log(password, examId);
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await User.create({ username, email, password: hashedPassword, examId });
      const data = {
        id: createdUser.dataValues.id,
        username: createdUser.dataValues.username,
        email: createdUser.dataValues.email,
        examId: createdUser.dataValues.examId,
      };
      res.status(200).json({ data, message: "User added successfull" });
    } catch (error) {
      next(error);
    }
  }
}
