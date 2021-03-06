import { Pipe, PipeMiddleware, PipeOnInit, Logger, PipeFactory } from "@bonbons/core";
import { TestService } from "../service/test";

@Pipe()
class PIpeClass3 extends PipeMiddleware<[number, string]> implements PipeOnInit {

  constructor(private test: TestService, private logger: Logger) {
    super();
  }

  pipeOnInit(): void {
    // console.log(this.params);
  }

  async process() {
    this.logger.debug("process in pipe [ ArrayPipe ]");
    console.log(this.params);
  }

}

export const ArrayPipe = PipeFactory.fromArray(PIpeClass3);
