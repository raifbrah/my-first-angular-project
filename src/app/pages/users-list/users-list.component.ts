import { Component } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../../components/create-edit-user/create-edit-user.component';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  private destroy$ = new Subject<null>();

  constructor(
    private usersApiService: UsersApiService,
    public usersService: UsersService,
    private matDialog: MatDialog,
    private storageService: StorageService,
  ) {
    const users = this.storageService.getItem('users')

    if (users === null || users.length === 0) {
      this.usersApiService
        .getUsers()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: User[]) => {
          this.usersService.users = [...data]
        })
    } else {
      this.usersService.users = [...users]
    }
  }

  addEditUser(user?: User) {
    const dialogRef = this.matDialog.open(
      CreateEditUserComponent,
      {data: user}
    )
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
      if (user) {
        this.usersService.addEditUser(user)
      }
    })
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(user);
  }

  ngOnDestroy() {
    this.destroy$.next(null)
    this.destroy$.complete()
  }
}
