// import { exceptionHandler } from "@src/middlewares";
import { leetCodeAuthCheck } from "../middlewares/leetcodeauth";
import { RouterClass } from "../classes";
import { SubmissionController } from "../controllers";
import { exceptionHandler } from "../middlewares";
export class SubmissionRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route("/problem/submit")
      .post(exceptionHandler(leetCodeAuthCheck), exceptionHandler(SubmissionController.submitProblem));
    // this.router
    //     .route("/get/submission-detail")
    //     .post(exceptionHandler(leetCodeAuthCheck), exceptionHandler(SubmissionController.getSubmissionDetails));
  }
}
