import { RouterClass } from "../classes";
import { UserController } from "../controllers";
import { exceptionHandler } from "../middlewares";

export class UserRouter extends RouterClass {
  constructor() {
    super();
  }

  public define(): void {
    this.router.route("/add/user").post(exceptionHandler(UserController.addUsers));
  }
}
