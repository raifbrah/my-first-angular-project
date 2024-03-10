import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input()
  user: any

  @Output()
  onDelete = new EventEmitter<string>()

  deleteUserCard() {
    this.onDelete.emit()
  }
}
