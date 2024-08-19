import User from "../models/user";
import bcrypt from "bcrypt";
import generator from "generate-password";
import { conflict, notFound } from "@hapi/boom";
import { RouterClass } from "@src/classes";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { Op } from "sequelize";

export class UserController {
  public constructor() {}

  public static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.findAll({
        where: { role: "USER" },
        order: [["createdAt", "DESC"]],
      });

      console.log("Queried users:", users); // Debugging output

      if (users.length === 0) {
        res.status(200).json({ message: "No Users found" });
      } else {
        res.status(200).json({ data: users, message: "Users fetched successfully" });
      }
    } catch (error) {
      next(error);
    }
  }

  public static async LoginAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw notFound("User not found");
      }

      if (password !== user.password) {
        throw conflict("Invalid Credentials");
      }

      if (user.role !== "ADMIN") {
        throw conflict("The user is not authorized");
      }

      if (user.status !== "ACTIVE") {
        throw conflict("Admin is not active");
      }

      const payload = {
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      };
      const token = await sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

      res.status(200).json({ data: { token, fullName: user.fullName }, message: "Admin logged in successfully" });
    } catch (error) {
      console.log(error, "error>>>>>>>>>>>>>>>");
      next(error);
    }
  }

  public static async verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = (req as any).user;
      console.log("asdfadfasdfasdfasdfhere>>>");
      res.status(200).json({ data: userData, message: "User verified successfully" });
    } catch (error) {
      next(error);
    }
  }

  public static async toggleUserStatus(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
      const userData = await User.findOne({ where: { id } });
      if (!userData) {
        throw conflict("User not found");
      }
      const userUpdated = await userData?.update({ status: userData.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" });

      if (userUpdated) {
        res.status(200).json({
          data: userUpdated,
          message: "User status updated successfully",
        });
      } else {
        throw conflict("User updated failed");
      }
    } catch (error) {
      next(error);
    }
  }

  public static async addUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, email } = req.body;
      console.log(fullName, email);

      const isUserExisted = await User.findOne({ where: { email } });

      if (isUserExisted) {
        throw conflict("User already exists!");
      }
      const userData = {
        fullName,
        email,
      };
      const createdUser = await User.create(userData);
      if (createdUser) res.status(200).json({ data: createdUser, message: "User added successfull" });
    } catch (error) {
      console.log(error, "user error add >>>>>>>");
      next(error);
    }
  }

  public static async searchUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { searchText, status } = req.body;
      console.log("this is search text", searchText);

      const isUserExisted = await User.findAll({
        where: {
          [Op.or]: [{ fullName: { [Op.like]: `%${searchText}%` } }, { email: { [Op.like]: `%${searchText}%` } }],
          role: "USER",
        },
      });
      console.log("this is user", isUserExisted);
      if (isUserExisted.length === 0) {
        res.status(200).json({ message: "No Users found" });
      } else {
        res.status(200).json({ data: isUserExisted, message: "Users fetched successfully" });
      }
    } catch (error) {
      next(error);
    }
  }
}
