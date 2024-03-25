import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(
    private storageService: StorageService
  ) {}

  users: User[] = []

  public addEditUser(user: User): void {
    if (user.id) {
      this.users = this.users.map(value => {
        return value.id === user.id
          ? {...value, ...user}
          : value
      })
      this.storageService.setItem('users', this.users)
    } else {
      this.users = [
        ...this.users,
        {...user, id: new Date().getTime()}
      ]
      this.storageService.setItem('users', this.users)
    }
  }

  public deleteUser(user: User): void {
    this.users = this.users.filter(value => value.id !== user.id)
    this.storageService.setItem('users', this.users)
  }
}
