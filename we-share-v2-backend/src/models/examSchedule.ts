import * as Sequelize from "sequelize";
import { Database } from "../config";
import Exams from "./exam"; // import Exams model

const sequelize = Database.sequelize;

const ExamSchedule = sequelize.define(
    "exam_schedules",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        examId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "exams",
                key: "id",
            },
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        paranoid: false,
        underscored: true,
        freezeTableName: true,
    }
);

// Define the association
Exams.hasMany(ExamSchedule, { foreignKey: "examId", as: "examSchedules" });



ExamSchedule.belongsTo(Exams, { foreignKey: "examId" });

export default ExamSchedule;
