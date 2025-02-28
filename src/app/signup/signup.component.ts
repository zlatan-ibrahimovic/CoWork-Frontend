import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router : Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;

     this.userService.register(userData).subscribe({
        next: (response) => {
          console.log('Inscription réussie :', response);
          this.errorMessage = null;
          this.router.navigate(['/login'])
        },
        error: (err) => {
          console.error('Erreur lors de l’inscription :', err);
          
          if (err.status === 409) {
            this.errorMessage = "Cet email est déjà utilisé.";
          } else {
            this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
          }
        },
      });
    } else {
      console.error('Formulaire invalide.');
    }
  }
}
