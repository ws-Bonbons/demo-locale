import { Injectable, Logger } from "@bonbons/core";
import { UUID } from "@bonbons/utils";

@Injectable()
export class TestService {

  public id = UUID.Create();

  constructor(private logger: Logger) {
    this.logger.info("test-sevice", "create test service.");
  }

}
