import { Injectable, Logger } from "@bonbons/core";
import { TestService } from "./test";


export abstract class ABC {
  abstract show(): string;
}

@Injectable()
export class ImplementService implements ABC {

  constructor(private test: TestService, private logger: Logger) {
    this.logger.info("imp-service", "imp service created.");
  }

  show(): string {
    return "func you!";
  }

}
