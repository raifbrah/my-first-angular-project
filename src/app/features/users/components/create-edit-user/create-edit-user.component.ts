import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
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
    ReactiveFormsModule,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css',
})
export class CreateEditUserComponent {
  constructor(
    private dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly user?: User,
  ) {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  public readonly userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public addUserCard(): void {
    const user = this.isEdit
      ? {
          id: this.user!.id,
          ...this.userForm.value,
        }
      : { ...this.userForm.value };
    this.dialogRef.close(user);
  }

  formControlInvalid(controlName: string) {
    return (
      this.userForm.controls[controlName].invalid &&
      this.userForm.controls[controlName].touched
    );
  }

  get isEdit(): boolean {
    return Boolean(this.user);
  }
}
