import { Component } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.interface';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { StorageService } from '../../../../core/services/storage.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule, MatButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  private destroy$ = new Subject<null>();

  constructor(
    private usersApiService: UsersApiService,
    public usersService: UsersService,
    private matDialog: MatDialog,
    private storageService: StorageService,
  ) {
    this.initUsers()
  }

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
        }),
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
    const users: (User[] | null) = this.storageService.getItem('users');

    if (users === null || users.length === 0) {
      this.usersApiService
        .getUsers()
        .pipe(
          takeUntil(this.destroy$),
          tap((data: User[]) => {
            this.usersService.users = [...data];
          }),
        )
        .subscribe();
    } else {
      this.usersService.users = [...users];
    }
  }
}
