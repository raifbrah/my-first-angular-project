import { Component, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { User } from '../../models/user.interface';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { Store } from '@ngrx/store';
import * as UsersSelectors from '../../+state/users.selectors';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule, MatButtonModule, AsyncPipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  private destroy$ = new Subject<null>();

  constructor(
    private usersApiService: UsersApiService,
    public usersService: UsersService,
    private matDialog: MatDialog
  ) {
    this.initUsers();
  }

  private readonly store = inject(Store);
  public readonly users$: Observable<User[]> = this.store.select(
    UsersSelectors.selectUsers
  );

  addEditUser(user?: User) {
    const dialogRef = this.matDialog.open(CreateEditUserComponent, {
      data: user,
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        tap((tapUser: User) => {
          if (tapUser) {
            this.usersService.addEditUser(tapUser);
          }
        })
      )
      .subscribe();
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(user);
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private initUsers() {
    this.usersApiService
      .getUsers()
      .pipe(
        takeUntil(this.destroy$),
        tap((data: User[]) => {
          this.usersService.initUsers(data);
        })
      )
      .subscribe();
  }
}
