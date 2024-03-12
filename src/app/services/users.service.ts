import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";

@Injectable({ providedIn: "root" })
export class UsersService {
  users: User[] = []

  addUsers(value: User[]) {
    this.users = value
  }

  pushUser(value: User) {
    this.users.push(value)
  }

  getUsers(): User[] {
    return this.users
  }

  deleteUser(index: number): void {
    this.users.splice(index, 1)
  }
}
