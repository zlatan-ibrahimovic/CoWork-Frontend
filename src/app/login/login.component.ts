import { AppComponent } from './../app.component';
import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoggedIn = false;

  constructor(private fb: FormBuilder, private appComponent : AppComponent  , private userService : UserService, private router : Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.isLoggedIn = !!this.userService.getToken();
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(response => {
        this.userService.saveToken(response.token);
        this.appComponent.tokenExists = true;
        this.router.navigate(['/tasks']);
      });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.userService.login(credentials).subscribe({
        next: (response) => {
          console.log('Connexion réussie :', response);
          this.userService.saveToken(response.token);
          this.errorMessage = null;
          this.isLoggedIn = true;

          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          console.error('Erreur lors de la connexion :', err);
          this.errorMessage = 'Email ou mot de passe incorrect.';
        },
      });
    } else {
      console.error('Formulaire invalide.');
    }
  }
}
