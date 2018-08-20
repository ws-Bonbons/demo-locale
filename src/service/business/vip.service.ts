import { Injectable, Logger } from "@bonbons/core";
import { UUID } from "@bonbons/utils";
import { User, StaffService } from "./staff.service";

export interface VIP {
  vid: string;
  level: number;
  user: User;
  operatorId: string;
}

@Injectable()
export class VipService {

  private vips: VIP[] = [];

  constructor(private logger: Logger, private staff: StaffService) {
    this.vips.push({
      vid: UUID.Create(),
      user: staff.getStaff()[0],
      level: 1,
      operatorId: "system"
    });
  }

  public addVip(userId: string, operatorId: string): { success: boolean, msg?: string, data?: string } {
    const vip = this.vips.find(i => i.user.id === userId);
    if (vip) {
      return { success: false, msg: "user is vip exist" };
    }
    const user = this.staff.findUser(userId);
    if (user === null) {
      return { success: false, msg: "user not found" };
    }
    const vid = UUID.Create();
    this.vips.push({
      operatorId,
      level: 1,
      vid,
      user
    });
    return { success: true, data: vid };
  }

  public getAllVips() {
    return this.vips.map(i => ({
      vipId: i.vid,
      user: i.user,
      level: i.level
    }));
  }

}