import { Routes } from '@angular/router';
import {UsersListComponent} from './pages/users-list/users-list.component';
import {HomeComponent} from './pages/home/home.component';

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
