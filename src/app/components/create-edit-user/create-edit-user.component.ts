import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) private data: any,
    private usersService: UsersService,
    public dialogRef: MatDialogRef<CreateEditUserComponent>
  ) {}

  public isEdit: boolean = false
  private userId: number = 1

  public myForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
  })

  ngOnInit() {
    this.myForm.patchValue(this.data)
  }

  addUserCard() {
    if (this.usersService.users.length) {
      this.userId = this.usersService.users[this.usersService.users.length - 1].id + 1
    }

    this.dialogRef.close({
      id: this.userId,
      ...this.myForm.value
    })
  }

  editUserCard() {
    this.dialogRef.close({
      id: this.data.id,
      ...this.myForm.value
    })
  }
}
