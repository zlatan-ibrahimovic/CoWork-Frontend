import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tokenExists: boolean = false;

  constructor(public userService: UserService, private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tokenExists = !!this.userService.getToken();
  }

  logout() {
    this.userService.logout();
    this.tokenExists = false;
    this.cdRef.detectChanges();
    this.router.navigate(['/login']);
  }
  
}
