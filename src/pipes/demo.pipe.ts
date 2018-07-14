import { Pipe, PipeMiddleware, PipeOnInit, Logger, PipeFactory } from "@bonbons/core";
import { TestService } from "../service/test";

@Pipe()
export class DemoPipe extends PipeMiddleware {

  constructor(private test: TestService, private logger: Logger) {
    super();
  }

  async process(next: () => Promise<any>) {
    this.logger.debug("process in pipe [ DemoPipe ]");
    console.log(this.params);
    await next();
  }

}
