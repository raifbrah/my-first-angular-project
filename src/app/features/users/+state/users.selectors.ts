import { createFeatureSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY } from './users.reducer';

export const selectUsers: any = createFeatureSelector(USERS_FEATURE_KEY);
