import { Pipe, PipeMiddleware, PipeOnInit, Logger, PipeFactory } from "@bonbons/core";
import { TestService } from "../service/test";

interface PipeDate {
  value: number;
  name: string;
}

@Pipe()
class PIpeClass2 extends PipeMiddleware<PipeDate> implements PipeOnInit {

  constructor(private test: TestService, private logger: Logger) {
    super();
    // console.log(this.test);
  }

  pipeOnInit(): void {
    // console.log(this.params);
  }

  async process() {
    this.logger.debug("process in pipe [ WrappedPipe ]");
    console.log(this.params);
  }

}

export const WrappedPipe = PipeFactory.generic(PIpeClass2);
