import { Component } from '@angular/core';
import { UsersListComponent } from './components/users-list/users-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersListComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {

}
