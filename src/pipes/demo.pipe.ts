import { Pipe, PipeMiddleware, PipeOnInit, Logger, PipeFactory, InjectService } from "@bonbons/core";
import { TestService } from "../service/test";
import { UUID, setColor } from "@bonbons/utils";
import { ABC } from "../service/imp";
import { AlwaysNewService } from "../service/new";

@Pipe()
export class DemoPipe extends PipeMiddleware {

  private id = UUID.Create();

  constructor(private test: TestService, private abc: ABC, private always: AlwaysNewService, private logger: Logger, private injector: InjectService) {
    super();
    console.log("\n======>create demo pipeline");
    // console.log(injector.get(ABC));
  }

  async process() {
    console.log("enter demo pipeline");
    // console.log(this.injector);
    // console.log(this.abc);
    this.logger.debug(`process in pipe [ DemoPipe : ${setColor("green", this.id)} ]`);
    this.logger.debug(`check singleton test service id : [${setColor("cyan", this.test.id)}]`);
    this.logger.debug(`check scoped abc service id : [${setColor("red", this.abc.show())}]`);
    this.logger.debug(`check renew always service id : [${setColor("magenta", this.always.id)}]`);
    console.log("======>leave demo pipeline\n");
  }

}
