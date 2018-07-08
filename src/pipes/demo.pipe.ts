import { Pipe, PipeMiddleware, PipeOnInit, GlobalLogger, PipeFactory } from "@bonbons/core";
import { TestService } from "../service/test";

@Pipe()
export class DemoPipe extends PipeMiddleware {

  constructor(private test: TestService, private logger: GlobalLogger) {
    super();
  }

  async process(next: () => Promise<any>) {
    this.logger.debug("process in pipe [ DemoPipe ]");
    console.log(this.params);
    await next();
  }

}
