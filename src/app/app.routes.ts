import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersListComponent} from './users-list/users-list.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Home",
  },
  {
    path: "users",
    component: UsersListComponent,
    title: "Users",
  }
];
