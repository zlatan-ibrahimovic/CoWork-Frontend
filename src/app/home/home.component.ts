import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tokenExists: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.tokenExists = !!this.userService.getToken();
  }
}
