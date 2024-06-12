import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.interface';
import { Store } from '@ngrx/store';
import * as UsersActions from '../+state/users.actions';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly store = inject(Store);

  public addEditUser(user: User): void {
    this.store.dispatch(UsersActions.addEditUser({ user: user }));
  }

  public deleteUser(user: User): void {
    this.store.dispatch(UsersActions.deleteUser({ user: user }));
  }

  public initUsers(users: User[]): void {
    this.store.dispatch(UsersActions.initUsers({ users: users }));
  }
}
