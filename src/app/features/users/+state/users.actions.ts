import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.interface';

export const addEditUser = createAction(
  '[Users Page] AddEdit',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[Users Page] DeleteUser',
  props<{ user: User }>()
);

export const initUsers = createAction(
  '[Users Page] InitUsers',
  props<{users: User[]}>()
)
