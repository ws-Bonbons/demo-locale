import { Injectable, Logger } from "@bonbons/core";
import { TestService } from "./test";
import { UUID } from "@bonbons/utils";


export abstract class ABC {
  abstract show(): string;
}

@Injectable()
export class ImplementService implements ABC {

  private id = UUID.Create();

  constructor(private test: TestService, private logger: Logger) {
    this.logger.info("imp-service", "imp service created.");
  }

  show(): string {
    return this.id;
  }

}
