import { Injectable, Logger } from "@bonbons/core";
import { UUID } from "@bonbons/utils";

export interface User {
  id: string;
  userName: string;
  role: "user" | "admin" | "super_admin";
}

@Injectable()
export class StaffService {

  private users: User[] = [
    { id: UUID.Create(), userName: "Mr.Xi", role: "user" }
  ];

  private admins: User[] = [
    { id: UUID.Create(), userName: "jojo", role: "admin" }
  ];

  private super_admins: User[] = [
    { id: UUID.Create(), userName: "mogician", role: "super_admin" },
    { id: UUID.Create(), userName: "Mr.Jiang", role: "super_admin" }
  ];

  constructor(private logger: Logger) {

  }

  public findUser(id: string): User | null {
    const staff = this.getStaff();
    const found = staff.find(i => i.id === id);
    if (found) {
      return found;
    }
    return null;
  }

  public getStaff(): User[] {
    return [
      ...this.users,
      ...this.getAllAdmin(),
      ...this.getAllSuperAdmin()
    ];
  }

  public getAllAdmin(): User[] {
    return this.admins;
  }

  public getAllSuperAdmin(): User[] {
    return this.super_admins;
  }

  public createUser(userName: string): string {
    const id = UUID.Create();
    this.users.push({
      id, userName,
      role: "user"
    });
    return id;
  }

  public updateUser(id: string, userName: string): User | null {
    const found = this.findUser(id);
    if (found) {
      found.userName = userName;
      return found;
    }
    return null;
  }

  public deleteUser(id: string): void {
    this.users = this.users.filter(i => i.id !== id);
    this.admins = this.admins.filter(i => i.id !== id);
    this.super_admins = this.super_admins.filter(i => i.id !== id);
  }

  public updateUserToAdmin(id: string): { success: boolean, msg?: string } {
    const user = this.users.find(i => i.id === id);
    if (!user) {
      return { success: false, msg: "user not found" };
    }
    user.role = "admin";
    this.users = this.users.filter(i => i.id !== id);
    this.admins.push(user);
    return { success: true };
  }

  public dismissAdminToUser(id: string): { success: boolean, msg?: string } {
    const admin = this.admins.find(i => i.id === id);
    if (!admin) {
      return { success: false, msg: "admin not found" };
    }
    admin.role = "user";
    this.admins = this.admins.filter(i => i.id !== id);
    this.users.push(admin);
    return { success: true };
  }

}