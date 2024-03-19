import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(
    private storageService: StorageService
  ) {}

  users: User[] = []

  public addUser(value: User): void {
    value.id = this.generateUserId()
    this.users = [...this.users, value]
    this.storageService.setItem('users', this.users)
  }

  public editUser(user: User): void {
    const newUsers = this.users.map(value => {
      if (value.id === user.id) {
        return {...value, ...user}
      } else {
        return value
      }
    })
    this.users = newUsers
    this.storageService.setItem('users', this.users)
  }

  public deleteUser(user: User): void {
    this.users = this.users.filter(value => value.id !== user.id)
    this.storageService.setItem('users', this.users)
  }

  private generateUserId(): number {
    let userId = 0
    if (this.users.length) {
      userId = this.users[this.users.length - 1].id + 1
    }
    return userId
  }
}
