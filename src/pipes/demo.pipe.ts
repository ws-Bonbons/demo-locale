import { Pipe, PipeMiddleware, PipeOnInit, Logger, PipeFactory, InjectService } from "@bonbons/core";
import { TestService } from "../service/test";
import { UUID } from "@bonbons/utils";
import { ABC } from "../service/imp";

@Pipe()
export class DemoPipe extends PipeMiddleware {

  private id = UUID.Create();

  constructor(private test: TestService, private abc: ABC, private logger: Logger, private injector: InjectService) {
    super();
    console.log("======>create demo pipeline");
    console.log(injector.get(ABC));
  }

  async process() {
    console.log("start demo pipeline");
    this.logger.debug(`process in pipe [ DemoPipe : ${this.id} ]`);
    this.logger.debug(`check singleton test service id : [${this.test.id}]`);
    this.logger.debug(`check scoped abc service id : [${this.abc.show()}]`);
    console.log("======>leave demo pipeline");
  }

}
