import { Component, EventEmitter, Output, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { ChangeDetectorRef } from '@angular/core';

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

  @Input() selectedTask: Task | null = null;
  @Output() taskAdded = new EventEmitter<{ title: string; description: string; priority: string }>();
  @Output() taskUpdated = new EventEmitter<Task>();

  constructor(private fb: FormBuilder, private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {    
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['LOW', Validators.required]
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
      this.taskAdded.emit(this.taskForm.value);
      this.taskForm.reset();
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
          console.log('Tâche mise à jour avec succès:', response);

          console.log('📢 Emission de l’événement taskUpdated:', response);
  
          // 🔥 Émettre l'événement pour informer `task-list` que la tâche a changé
          this.taskUpdated.emit(response);
  
          // Réinitialise le formulaire et la sélection
          this.taskForm.reset();
          this.selectedTask = null;
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de la tâche:', err);
        },
      });
    }  
  }
}
