import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  @Output() taskAdded = new EventEmitter<{ title: string; description: string; priority: string }>();

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['Normal', Validators.required]
    });
  }

  onTitleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();
    this.taskForm.patchValue({ title: inputElement.value }, { emitEvent: false });
  }
  
  onSubmit() {
    if (this.taskForm.valid) {
        if (this.taskForm.invalid) {
            this.taskForm.markAllAsTouched();
            return;
    }
    this.taskAdded.emit(this.taskForm.value);
    this.taskForm.reset();
    }
  }
}
