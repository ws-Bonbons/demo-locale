import { Controller, BaseController, Logger, Method, JsonResult, Route, FromBody } from "@bonbons/core";
import { TestService } from "../service/test";
import { ABC } from "../service/imp";

@Controller("more")
export class MoreController extends BaseController {

  constructor(
    private logger: Logger,
    private test: TestService,
    private imp: ABC) {
    super();
  }

  // @GET
  @Method("GET")
  @Route("/index")
  public index(): JsonResult {
    this.logger.debug("MoreController", "index");
    return this.toJSON({
      v: "hello"
    });
  }

  @Method("POST", "PUT", "DELETE")
  @Route("/postJSon")
  public receivePost(@FromBody() params) {
    this.logger.debug("MoreController", "receivePost");
    return this.toJSON(params);
  }

}