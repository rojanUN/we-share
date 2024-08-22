// import { exceptionHandler } from "@src/middlewares";
import { leetCodeAuthCheck } from "../middlewares/leetcodeauth";
import { RouterClass } from "../classes";
import { ProblemController } from "../controllers";
import { exceptionHandler } from "../middlewares";
import { ExamController } from "../controllers/ExamController";
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
  }
}
