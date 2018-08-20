import { Controller, Pipes, BaseController, Route, Method, FromBody } from "@bonbons/core";
import { Role } from "../pipes/role.pipe";
import { StaffService } from "../service/business/staff.service";
import { VipService } from "../service/business/vip.service";
import { Serialize, Deserialize } from "@bonbons/utils";

class CreateUserVM {

  @Serialize("name")
  @Deserialize("name")
  private name: string;
  public get Name() { return "prefix-" + this.name; }

}

@Controller("business")
export class BusinessController extends BaseController {

  constructor(private staff: StaffService, private vip: VipService) {
    super();
  }

  @Method("GET")
  @Route("/index")
  public async Index() {
    await this.sleep(100);
    this.views.data = {
      title: "index",
      message: "hello world!"
    };
    return this.render("test");
  }

  @Method("GET")
  @Route("/admin/dashboard")
  @Pipes([Role("admin", "super_admin")])
  public async AdminIndex() {
    await this.sleep(100);
    this.views.data = {
      title: "admin-index",
      message: "hello admin!"
    };
    return this.render("test");
  }

  @Method("GET")
  @Route("/staff")
  @Pipes([Role("admin", "super_admin")])
  public async QueryStaff() {
    await this.sleep(50);
    return this.toJSON({
      code: 200,
      message: "success",
      staff: this.staff.getStaff()
    });
  }

  @Method("GET")
  @Route("/user?{id}")
  public async QueryUSER(id: string) {
    await this.sleep(50);
    return this.toJSON({
      code: 200,
      message: "success",
      staff: this.staff.findUser(id)
    });
  }

  @Method("POST")
  @Route("/user")
  public async CreateUser(@FromBody() user: CreateUserVM) {
    await this.sleep(100);
    if (!user || !user.Name) {
      throw new Error("username is not previded");
    }
    const id = this.staff.createUser(user.Name);
    return this.toJSON({
      code: 200,
      message: "success",
      data: { id }
    });
  }

  @Method("PUT")
  @Route("/admin/add")
  @Pipes([Role("super_admin")])
  public async AddAdmin(@FromBody() DATA) {
    await this.sleep(500);
    if (!DATA || !DATA.id) {
      throw new Error("userid is not previded");
    }
    const result = this.staff.updateUserToAdmin(DATA.id);
    return this.toJSON({
      code: result.success ? 200 : 500,
      message: result.msg && "success"
    });
  }

  @Method("PUT")
  @Route("/admin/dismiss")
  @Pipes([Role("super_admin")])
  public async DismissAdmin(@FromBody() DATA: any) {
    await this.sleep(500);
    if (!DATA || !DATA.id) {
      throw new Error("userid is not previded");
    }
    const result = this.staff.dismissAdminToUser(DATA.id);
    return this.toJSON({
      code: result.success ? 200 : 500,
      message: result.msg && "success"
    });
  }

  @Method("GET")
  @Route("/vips")
  public async ShowAllVIP() {
    return this.toJSON({
      code: 200,
      message: "success",
      data: this.vip.getAllVips()
    });
  }

}
