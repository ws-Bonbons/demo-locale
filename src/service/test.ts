import { Injectable } from "@bonbons/decorators";
import { GlobalLogger } from "@bonbons/plugins";

@Injectable()
export class TestService {

  constructor(private logger: GlobalLogger) {
    this.logger.info("test-sevice", "create test service.");
  }

}
