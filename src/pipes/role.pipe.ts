import { Pipe, PipeMiddleware, PipeOnInit, Logger, PipeFactory } from "@bonbons/core";
import { TestService } from "../service/test";

export interface RoleDefine {
  roles: string[];
}

@Pipe()
class RolePipe extends PipeMiddleware<RoleDefine> implements PipeOnInit {

  constructor(private LOGGER: Logger) {
    super();
  }

  pipeOnInit(): void {

  }

  async process() {
    const token = this.context.request.header["access_token"];
    if (this.params.roles.findIndex(i => i === token) < 0) {
      throw new Error("Access denied");
    }
  }

}

export const Role = (...roles: string[]) => PipeFactory.generic(RolePipe)({ roles });
