import { Component } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  constructor(
    private usersApiService: UsersApiService,
    private usersService: UsersService,
  ) {}

  users: User[] = []

  deleteUserCard(index: number) {
    this.usersService.deleteUser(index);
  }

  ngOnInit() {
    this.usersApiService
      .getUsers()
      .subscribe((data: any) => {
        this.usersService.addUsers(data)
        this.users = this.usersService.getUsers()
      })
  }
}
