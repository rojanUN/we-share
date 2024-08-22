import * as Sequelize from "sequelize";
import ExamSchedule from "./examSchedule";
import { Database } from "../config";

const sequelize = Database.sequelize;

const Exams = sequelize.define(
  "exams",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    examTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    examDescription: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    mcqQuestionMarks: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    codeQuestionMediumHardMarks: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    codeQuestionEasyMarks: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    hasCodeQuestions: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    totalMarks: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    endTime: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    startDate: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    endDate: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
  }
);

export default Exams;
