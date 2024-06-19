import * as Sequelize from "sequelize";

import { Database } from "@src/config";

const sequelize = Database.sequelize;

const User = sequelize.define(
  "authenticator_users",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    sub: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        name: "authenticator_users_email",
        fields: ["email"],
        where: {
          deletedAt: null,
        },
      },
    ],
  }
);

export default User;
