import * as Sequelize from "sequelize";

import { Database } from "../config";

const sequelize = Database.sequelize;

const Results = sequelize.define(
  "results",
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    full_screen_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    high_noise_count: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    out_of_view_count: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    attempted_question_count: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    obtained_marks: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    total_marks: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
  }
);

export default Results;
