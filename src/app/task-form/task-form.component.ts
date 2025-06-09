import { Component, EventEmitter, Output, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {
  taskForm!: FormGroup;
  tasks: Task[] = [];
  successMessage: string | null = null;

  @Input() selectedTask: Task | null = null;
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() taskAdded = new EventEmitter<Task>(); 

  constructor(private fb: FormBuilder, private taskService: TaskService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {    
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const taskId = params.get('id');
      if (taskId) {
        this.loadTask(+taskId);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedTask'] && changes['selectedTask'].currentValue) {
      const task = changes['selectedTask'].currentValue as Task;
      console.log("🔄 Mise à jour du formulaire avec :", task);

      this.taskForm.patchValue({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'LOW',
      });

      this.cdr.detectChanges();
    }
  }

  onTitleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();
    this.taskForm.patchValue({ title: inputElement.value }, { emitEvent: false });
  }

  

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.selectedTask) {
        this.updateTask(); // Mode édition
      } else {
        this.taskService.addTask(this.taskForm.value).subscribe({
          next: (response) => {
            console.log("✅ Tâche ajoutée avec succès :", response);
            this.taskForm.reset();
            
            // 🔥 Afficher le message de succès
            this.successMessage = "✅ Tâche ajoutée avec succès !";
    
            // ⏳ Masquer le message après 2 secondes et rediriger
            setTimeout(() => {
              this.successMessage = null;
              this.router.navigate(['/tasks']);
            }, 2000);
          },
          error: (error) => {
            console.error("❌ Erreur lors de l'ajout de la tâche :", error);
          }
        });
      }
    }
  }
  

  updateTask() {
    if (this.selectedTask) {
      const updatedTask = {
        ...this.selectedTask,
        ...this.taskForm.value,
      };
  
      this.taskService.updateTask(updatedTask).subscribe({
        next: (response) => {
          console.log('✅ Tâche mise à jour avec succès:', response);
  
          // 🔥 Émettre l'événement pour informer `task-list` que la tâche a changé
          this.taskUpdated.emit(response);
  
          // ✅ Afficher un message de succès
          this.successMessage = "✅ Tâche mise à jour avec succès !";
  
          // ⏳ Masquer le message et rediriger après 2 secondes
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/tasks']);
          }, 2000);
        },
        error: (err) => {
          console.error('❌ Erreur lors de la mise à jour de la tâche:', err);
        },
      });
    }
  }

  loadTask(taskId: number) {
    this.taskService.getTaskById(taskId).subscribe({
      next: (task) => {
        console.log("📝 Tâche chargée :", task);
        this.selectedTask = task;
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          priority: task.priority,
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("❌ Erreur lors du chargement de la tâche :", err);
      }
    });
  }
}