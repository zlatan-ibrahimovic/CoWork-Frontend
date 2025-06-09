import { Component, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import {FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../models/task.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, RouterModule]
  
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  viewMode: 'list' | 'cards' = 'list';
  errorMessage: string | null = null;
  taskForm: FormGroup;
  successMessage: string | null = null;
  today: Date = new Date();

  @Input() selectedTask: Task | null = null;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      priority: ['']
    });
  }

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  
    this.taskService.getTasks().subscribe(); // Charge les tâches au démarrage
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
  
  selectTask(task: Task) {
    console.log("📌 selectTask() appelée dans TaskListComponent avec :", task);
    this.selectedTask = { ...task }; // Copie l'objet pour éviter les modifications directes
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      priority: task.priority
    });
  }

 onTaskUpdated(updatedTask: Task) {
  console.log('🔄 Tâche mise à jour dans la liste :', updatedTask);

  // 🔥 Met à jour la tâche dans la liste sans recharger la page
  this.tasks = this.tasks.map(task =>
    task.id === updatedTask.id ? updatedTask : task
  );
}

  

  deleteTask(taskId: number) {
    if (!confirm("Es-tu sûr de vouloir supprimer cette tâche ?")) {
      return;
    }
  
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        console.log(`✅ Tâche ${taskId} supprimée avec succès.`);
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.successMessage = "🗑️ Tâche supprimée avec succès.";

        setTimeout(() => {
          this.successMessage = null;
        }, 2000);
      },
      error: (err) => {
        console.error(`❌ Erreur lors de la suppression de la tâche ${taskId} :`, err);
      }
    });
  } 
  
}