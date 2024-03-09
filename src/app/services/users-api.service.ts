import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {User} from "../interfaces/user";

@Injectable({ providedIn: "root" })
export class UsersApiService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
  }
}
