import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-task-main',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.css'],
})
export class TaskMainComponent {

  
  constructor(private router: Router) {}
}
