import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import { conflict } from "@hapi/boom";

export class UserController {
  public constructor() {}

  public static async addUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;

      const isUserExisted = await User.findOne({ where: { email } });

      if (isUserExisted) {
        throw conflict("User already exists!");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await User.create({ username, email, password: hashedPassword });
      const data = {
        id: createdUser.dataValues.id,
        username: createdUser.dataValues.username,
        email: createdUser.dataValues.email,
      };
      res.status(200).json({ data, message: "User added successfull" });
    } catch (error) {
      next(error);
    }
  }
}
