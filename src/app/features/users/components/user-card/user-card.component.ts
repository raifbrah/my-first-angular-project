import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { User } from '../../models/user.interface';

@Component({
  selector: 'user-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input({ required: true })
  user: User

  @Output()
  deleteUser = new EventEmitter<User>()

  @Output()
  editUser = new EventEmitter<User>()

  deleteUserCard() {
    this.deleteUser.emit(this.user)
  }

  editUserCard() {
    this.editUser.emit(this.user)
  }
}
