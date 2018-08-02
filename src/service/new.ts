import { Injectable, Logger } from "@bonbons/core";
import { UUID } from "@bonbons/utils";

@Injectable()
export class AlwaysNewService {

  public id = UUID.Create();

  constructor(private logger: Logger) {
    this.logger.info("new-sevice", "create always new service.");
  }

}
