import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'user-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input()
  user: any

  @Output()
  deleteUser = new EventEmitter<string>()

  deleteUserCard() {
    this.deleteUser.emit()
  }
}
