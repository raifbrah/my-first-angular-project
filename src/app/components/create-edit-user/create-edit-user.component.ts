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
import { User } from '../../interfaces/user.interface';


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
    @Inject(MAT_DIALOG_DATA) private readonly data: User,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<CreateEditUserComponent>
  ) {
    this.myForm.patchValue(this.data)
  }

  public myForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
  })

  addUserCard(): void {
    this.dialogRef.close({
      ...this.myForm.value
    })
  }

  editUserCard(): void {
    this.dialogRef.close({
      id: this.data.id,
      ...this.myForm.value
    })
  }

  get isEdit(): boolean {
    return Boolean(this.data)
  }
}
