import { TestService } from "../service/test";
import { Pipe } from "@bonbons/decorators";
import { GlobalLogger } from "@bonbons/plugins";
import { PipeOnInit, PipeMiddleware, PipeFactory } from "@bonbons/pipes";

interface PipeDate {
  value: number;
  name: string;
}

@Pipe()
class PIpeClass2 extends PipeMiddleware<PipeDate> implements PipeOnInit {

  constructor(private test: TestService, private logger: GlobalLogger) {
    super();
    // console.log(this.test);
  }

  pipeOnInit(): void {
    // console.log(this.params);
  }

  async process(next: () => Promise<any>) {
    this.logger.debug("process in pipe [ WrappedPipe ]");
    console.log(this.params);
    await next();
  }

}

export const WrappedPipe = PipeFactory.generic(PIpeClass2);
