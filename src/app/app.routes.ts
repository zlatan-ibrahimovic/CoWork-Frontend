import { provideRouter, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AuthGuard } from './auth.guard';
import { TaskFormComponent } from './task-form/task-form.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard]},
  { path: 'tasks/add', component: TaskFormComponent, canActivate: [AuthGuard]},
  { path: 'tasks/edit/:id', component: TaskFormComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path : '', component: HomeComponent},
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: ''}
];

export const appRouting = provideRouter(routes);
