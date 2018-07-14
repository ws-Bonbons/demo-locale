import { Injectable, Logger } from "@bonbons/core";

@Injectable()
export class TestService {

  constructor(private logger: Logger) {
    this.logger.info("test-sevice", "create test service.");
  }

}
