import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import { conflict } from "@hapi/boom";
import generator from "generate-password";

export class UserController {
  public constructor() { }

  public static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const Users = await User.findAll({ order: [['createdAt', 'DESC']] });
      if (Users.length === 0) {
        res.status(200).json({ message: "No Users found" });
      }
      else {
        console.log("thos is users", Users);
        res.status(200).json({ data: Users, message: "Users fetched successfully" });
      }
    }
    catch (error) {
      next(error);
    }
  }

  public static async addUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, email } = req.body;

      const isUserExisted = await User.findOne({ where: { email } });

      if (isUserExisted) {
        throw conflict("User already exists!");
      }
      const userData = {
        fullName,
        email,
      }
      const createdUser = await User.create(userData);
      if (createdUser)
        res.status(200).json({ data: createdUser, message: "User added successfull" });

    } catch (error) {
      next(error);
    }
  }
}
