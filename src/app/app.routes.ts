import { provideRouter, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '/login'}
];

export const appRouting = provideRouter(routes);
