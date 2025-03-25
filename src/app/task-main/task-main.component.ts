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

  // Liste des routes où le composant "Gestion des tâches" doit être masqué
  hiddenRoutes = ['/tasks', '/login', '/signup'];

  constructor(public router: Router) {}

  shouldShowHeader(): boolean {
    return !this.hiddenRoutes.includes(this.router.url);
  }
}
