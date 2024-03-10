import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";

@Injectable({ providedIn: "root" })
export class UsersService {
  users: User[] = []

  addUsers(value: User[]) {
    this.users = value
  }

  getUsers(): User[] {
    return this.users
  }

  deleteUser(index: number): void {
    this.users.splice(index, 1)
  }
}
