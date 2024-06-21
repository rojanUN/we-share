// import { exceptionHandler } from "@src/middlewares";
import { RouterClass } from "../classes";
import { ProblemController } from "../controllers";
import { exceptionHandler } from "../middlewares";
export class ProblemRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router.route("/get/multiple").post(exceptionHandler(ProblemController.singleProblem));
    this.router.route("/get/single").post(exceptionHandler(ProblemController.singleProblem));
  }
}
