import { Component, OnInit } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  users: User[] = []
  private destroy$ = new Subject<null> ();

  constructor(
    private usersApiService: UsersApiService,
    private usersService: UsersService,
  ) {}

  deleteUserCard(index: number) {
    this.usersService.deleteUser(index);
  }

  ngOnInit() {
    this.usersApiService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: User[]) => {
        this.usersService.addUsers(data)
        this.users = this.usersService.getUsers()
      })
  }

  ngOnDestroy() {
    this.destroy$.next(null)
    this.destroy$.complete()
  }
}
