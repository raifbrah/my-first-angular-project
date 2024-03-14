import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/users.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'create-edit-user-dialog',
  standalone: true,
  imports: [
    NgIf,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css'
})
export class CreateEditUserComponent {
  constructor(
    private usersService: UsersService,
  ) {}

  public myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  addUserCard() {
    let newUserId: number = 1


    if (this.usersService.users.length) {
      newUserId = this.usersService.users[this.usersService.users.length - 1].id + 1
    }

    this.usersService.pushUser({
      id: newUserId,
      ...this.myForm.value
    })
  }
}
