import * as dotenv from "dotenv";
import * as sequelize from "sequelize";

import { EnvironmentEnum } from "../enums/environmentEnum";

const mustExist = <T>(value: T | undefined, name: string): T => {
  if (!value) {
    console.error(`Missing Config: ${name} !!!`);
    process.exit(1);
  }
  return value;
};

dotenv.config();

export const port = mustExist(+process.env.PORT!, "PORT") as number,
  appName = mustExist(process.env.APP_NAME!, "APP_NAME") as string,
  environment = process.env.ENVIRONMENT || (EnvironmentEnum.DEVELOPMENT as EnvironmentEnum),
  db = {
    username: mustExist(process.env.DB_USER!, "DB_USER"),
    password: mustExist(process.env.DB_PASSWORD!, "DB_PASSWORD"),
    name: mustExist(process.env.DB_NAME!, "DB_NAME"),
    host: mustExist(process.env.DB_HOST!, "DB_HOST"),
    dialect: mustExist(process.env.DB_DIALECT!, "DB_DIALECT"),
    port: mustExist(+process.env.DB_PORT!, "DB_PORT"),
    logging: false,
    timezone: "utc",
  } as {
    username: string;
    password: string;
    name: string;
    host: string;
    dialect: sequelize.Dialect;
    port: number;
    logging: boolean;
    timezone: string;
  },
  // Providers base url
  leetcode = {
    baseUrl: mustExist(process.env.LEETCODE_BASE_URL!, "LEETCODE_BASE_URL"),
  } as {
    baseUrl: string;
  },
  baseUrl = {
    Url: mustExist(process.env.CLIENT_BASE_URL!, "CLIENT_BASE_URL"),
  } as {
    Url: string;
  },
  LeetcodeGraphqlEndPoint = {
    url: mustExist(process.env.LEETCODE_GRAPHQL_URL!, "LEETCODE_GRAPHQL_URL"),
  } as {
    url: string;
  };

export * from "./instance";
