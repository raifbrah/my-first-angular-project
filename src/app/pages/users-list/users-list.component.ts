import { Component } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user';
import { Subject, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../../components/create-edit-user/create-edit-user.component';

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
  ) { }

  addUser() {
    let dialogRef = this.matDialog.open(
      CreateEditUserComponent, 
    )
    dialogRef.afterClosed().subscribe((user: User) => {
      if (user) {
        this.usersService.pushUser(user)
      }
    })
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(user);
  }

  editUser(user: User) {
    let dialogRef = this.matDialog.open(
      CreateEditUserComponent,
      {data: user}
    )
    dialogRef.componentInstance.isEdit = true

    dialogRef.afterClosed().subscribe((user: User) => {
      if (user) {
        this.usersService.editUser(user)
      }
    })
  }

  ngOnInit() {
    if (
      !localStorage["users"]
      || JSON.parse(localStorage["users"]).length === 0
    ) {
      this.usersApiService
        .getUsers()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: User[]) => {
          localStorage["users"] = JSON.stringify(data)
          this.usersService.addUsers(data)
        })
    } else {
      this.usersService.addUsers(
        JSON.parse(localStorage["users"])
      )
    }
  }

  ngOnDestroy() {
    this.destroy$.next(null)
    this.destroy$.complete()
  }
}
