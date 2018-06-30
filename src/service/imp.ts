import { TestService } from "./test";
import { GlobalLogger } from "@bonbons/plugins";
import { Injectable } from "@bonbons/decorators";

export abstract class ABC {
  abstract show(): string;
}

@Injectable()
export class ImplementService implements ABC {

  constructor(private test: TestService, private logger: GlobalLogger) {
    this.logger.info("imp-service", "imp service created.");
  }

  show(): string {
    return "func you!";
  }

}
