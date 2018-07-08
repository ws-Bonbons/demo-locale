import { Injectable, GlobalLogger } from "@bonbons/core";

@Injectable()
export class TestService {

  constructor(private logger: GlobalLogger) {
    this.logger.info("test-sevice", "create test service.");
  }

}
