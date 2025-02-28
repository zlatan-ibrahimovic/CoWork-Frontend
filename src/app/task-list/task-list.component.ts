import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, TaskFormComponent]
  
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  viewMode: 'list' | 'cards' = 'list';
  errorMessage: string | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    console.log('🚀 TaskListComponent monté dans le DOM');
  }
  

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        console.log('✅ Tâches récupérées :', data);
        this.tasks = data;
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('❌ Erreur lors de la récupération des tâches :', error);
        this.errorMessage = "Impossible de récupérer les tâches. Vérifiez votre connexion.";
      },
      complete: () => {
        console.log('✅ Récupération des tâches terminée.');
      }
    });
  }
  
  setViewMode(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.viewMode = target.value as 'list' | 'cards';
    }
  }
  getPriorityClass(priority: string): string {
  switch (priority) {
    case 'HIGH':
      return 'danger'; // Rouge pour urgent
    case 'MEDIUM':
      return 'warning'; // Orange pour normal
    case 'LOW':
      return 'success'; // Vert pour faible
    default:
      return 'secondary'; // Gris par défaut
  }
}


  addTask(newTask: { title: string; description: string; priority: string }) {
    this.taskService.addTask(newTask).subscribe({
      next: (response) => {
        console.log('✅ Tâche ajoutée avec succès :', response);
        this.tasks = [...this.tasks, response];
      },
      error: (error) => {
        console.error('❌ Erreur lors de l\'ajout de la tâche :', error);
      }
    });
  }
  
}
