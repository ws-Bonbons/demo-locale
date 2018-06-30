import { TestService } from "../service/test";
import { ABC } from "../service/imp";
import { DemoPipe } from "../pipes/demo.pipe";
import { WrappedPipe } from "../pipes/wrap.pipe";
import { ArrayPipe } from "../pipes/array.pipe";
import { middleware01 } from "../middlewares/md01";
import { Controller, Pipes, Method, Route, Middlewares, FromBody, FromForm } from "@bonbons/decorators";
import { InjectService, GlobalLogger } from "@bonbons/plugins";
import { BaseController } from "@bonbons/controllers";

const fucker = ArrayPipe([666666, "mother fucker"]);

@Controller("api")
@Pipes([DemoPipe])
export class TestController extends BaseController {

  constructor(
    private injector: InjectService,
    private logger: GlobalLogger,
    private test: TestService,
    private imp: ABC) {
    super();
  }

  // @GET
  @Method("GET")
  @Route("/index/:abc/:def?{id}&{name}&{fuck}")
  @Pipes([WrappedPipe({ name: "a", value: 2 }), DemoPipe, ArrayPipe([123, "woshinidie"]), fucker, fucker], false)
  @Middlewares([middleware01()])
  public index(abc: string, def: string, id: number, name: string, fuck: string) {
    this.logger.debug("TestController", "index");
    this.views.data = {
      query: this.context.request.querystring,
      moreMessage: " woshinidie " + fuck + " -- " + this.imp.show(),
      checks: {
        test: this.test,
        imp: this.imp,
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

  // @POST
  @Method("POST")
  @Route("/postJSon")
  public SendMessage(@FromBody("application/javascript") params) {
    this.logger.debug("TestController", "SendMessage");
    return this.toJSON(params);
  }

  @Method("POST")
  @Route("/postForm")
  @Pipes([], false)
  public SendFormMessage(@FromForm({ formLimit: "50kb", }) params) {
    this.logger.debug("TestController", "SendFormMessage");
    return this.toJSON(params);
  }

}