import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";

@Injectable({ providedIn: "root" })
export class UsersService {
  users: User[] = []

  addUsers(value: User[]) {
    this.users = value
  }

  pushUser(user: User) {
    this.users.push(user)
  }

  getUsers(): User[] {
    return this.users
  }

  deleteUser(user: User): void {
    this.users = this.users.filter(value => value.id !== user.id)
  }
}
