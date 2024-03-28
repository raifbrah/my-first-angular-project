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
import { NgIf } from '@angular/common';
import { User } from '../../models/user.interface';


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
    private dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly user?: User
  ) {
    if (this.user) {
      this.myForm.patchValue(this.user)
    }
  }

  public readonly myForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
  })

  addUserCard(): void {
    if (this.user) {
      this.dialogRef.close({
        id: this.user.id,
        ...this.myForm.value
      })
    } else {
      this.dialogRef.close({...this.myForm.value})
    }
  }

  get isEdit(): boolean {
    return Boolean(this.user)
  }
}
