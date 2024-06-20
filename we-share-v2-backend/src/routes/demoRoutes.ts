// import { exceptionHandler } from "@src/middlewares";
import { RouterClass } from "@src/classes";
// import { Guard } from "@src/middlewares";

export class MediaRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router.route("/fetch/problem");
    this.router.route("fetch/problems");
  }
}
//to use the guard middleware
// .post(
//     exceptionHandler(Guard.grant),
// );
