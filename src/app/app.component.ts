import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd} from '@angular/router';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { TaskMainComponent } from './task-main/task-main.component';
import { HomeComponent } from "./home/home.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, TaskMainComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tokenExists: boolean = false;
  isHomePage: boolean = false;
  
  constructor(public userService: UserService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isHomePage = event.url === '/' || event.url === '/home'; // Vérifie l'URL
      });
  }

  ngOnInit(): void {
    this.userService.token$.subscribe((isLoggedIn) => {
      this.tokenExists = isLoggedIn;
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
  
}