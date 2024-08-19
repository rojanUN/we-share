// import { exceptionHandler } from "@src/middlewares";
import { RouterClass } from "../classes";
import { exceptionHandler } from "../middlewares";
import { ExamController } from "../controllers/ExamController";
import { ResultController } from "../controllers/ResultController";
export class ExamRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router.route("/add-exam").post(exceptionHandler(ExamController.AddExam));
    this.router.route("/get-exam").get(exceptionHandler(ExamController.GetExams));
    this.router.route("/schedule-exam").post(exceptionHandler(ExamController.ScheduleExam));
    this.router.route("/unschedule-exam").post(exceptionHandler(ExamController.UnScheduleExam));
    this.router.route("/login-exam").post(exceptionHandler(ExamController.LoginExam));
    this.router.route("/results").post(exceptionHandler(ResultController.handleResultEvaluation));
  }
}
