import { Injectable } from "@angular/core";
import { User } from "../models/user.interface";
import { StorageService } from "../../../core/services/storage.service";

@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(
    private storageService: StorageService
  ) {}

  users: User[] = []

  public addEditUser(user: User): void {
    if (user.id) {
      this.users = this.users.map(mapUser => {
        return mapUser.id === user.id
          ? {...mapUser, ...user}
          : mapUser
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
    this.users = this.users.filter(filterUser => filterUser.id !== user.id)
    this.storageService.setItem('users', this.users)
  }
}
