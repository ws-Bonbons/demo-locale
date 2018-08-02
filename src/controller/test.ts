import {
  BaseController,
  Controller,
  Pipes,
  Method,
  Route,
  Middlewares,
  FromBody,
  FromForm,
  InjectService,
  Logger
} from "@bonbons/core";
import { TestService } from "../service/test";
import { ABC } from "../service/imp";
import { DemoPipe } from "../pipes/demo.pipe";
import { WrappedPipe } from "../pipes/wrap.pipe";
import { ArrayPipe } from "../pipes/array.pipe";
import { middleware01 } from "../middlewares/md01";

const fucker = ArrayPipe([666666, "mother fucker"]);

@Controller("api")
@Pipes([DemoPipe])
export class TestController extends BaseController {

  constructor(
    private injector: InjectService,
    private logger: Logger,
    private test: TestService,
    private imp: ABC) {
    super();
  }

  // @GET
  @Method("GET")
  @Route("/index/:abc/:def?{id}&{name}&{fuck}")
  // @Pipes([WrappedPipe({ name: "a", value: 2 }), DemoPipe, ArrayPipe([123, "woshinidie"]), fucker, fucker], false)
  // @Middlewares([middleware01()])
  public index(abc: string, def: string, id: number, name: string, fuck: boolean) {
    this.logger.debug("Test-Controller", "index", "prepare render tpl view.");
    this.views.data = {
      // getNumber: this.context.get("id", Number),
      // getNumberType: typeof this.context.get("id", Number),
      // getString: this.context.get("name"),
      // getBoolean: this.context.get("fuck", Boolean),
      // getMistake: this.context.get("abc", Number),
      // query: this.context.request.querystring,
      // moreMessage: " woshinidie " + fuck + " -- " + this.imp.show(),
      checks: {
        msg: { abc, def, id, name },
        typeChecks: {
          abc: typeof abc,
          def: typeof def,
          id: typeof id,
          name: typeof name
        }
      }
    };
    return this.render("test");
    // throw new Error("fuck breaks!");
    // return this.toJSON({
    //   query: this.context.request.querystring,
    //   moreMessage: " woshinidie " + fuck + " -- " + this.imp.show(),
    //   checks: {
    //     test: this.test,
    //     imp: this.imp,
    //     msg: { abc, def, id, name },
    //     typeChecks: {
    //       abc: typeof abc,
    //       def: typeof def,
    //       id: typeof id,
    //       name: typeof name
    //     }
    //   }
    // });
  }

  @Method("GET")
  @Route("/get/message")
  public GETMessage() {
    console.log("come in to controller method");
    return this.toJSON({
      code: 0,
      message: "success",
      data: {
        newData: "123456",
        oldData: "123456",
        dataArray: [
          { dataStatus: 200, errorMessage: null },
          { dataStatus: 500, errorMessage: "server error" },
        ]
      }
    });
  }

  // @POST
  @Method("POST")
  @Route("/postJSon")
  public SendMessage(@FromBody("application/javascript") params) {
    this.logger.debug("Test-Controller", "SendMessage", "test form parse for json.");
    return this.toJSON(params);
  }

  @Method("POST")
  @Route("/postForm")
  @Pipes([], false)
  public SendFormMessage(@FromForm({ formLimit: "50kb", }) params) {
    this.logger.debug("Test-Controller", "SendFormMessage", "test form parse for url-encoded.");
    return this.toJSON(params);
  }

}