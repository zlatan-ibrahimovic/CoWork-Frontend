import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = this.userService.getToken();
    console.log("🛡️ [AuthGuard] Vérification du token :", token);

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
