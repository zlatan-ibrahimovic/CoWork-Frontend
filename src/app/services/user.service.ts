import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authApiUrl = 'http://localhost:8080/api/auth';
  private userApiUrl = 'http://localhost:8080/api/users';
  private TOKEN_KEY = 'authToken';

  // 🔥 Crée un BehaviorSubject pour suivre l'état du token
  private tokenSubject = new BehaviorSubject<boolean>(this.hasToken());
  token$ = this.tokenSubject.asObservable(); // Observable pour écouter les changements

  constructor(private http: HttpClient) {}

  register(userData: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.userApiUrl}/register`, userData, { headers });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.authApiUrl}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      tap((response) => {
        if (response.token) {
          this.saveToken(response.token);
          this.tokenSubject.next(true); // 🔥 Met à jour l'état du token
        } else {
          console.error("Aucun token reçu !");
        }
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, `Bearer ${token}`);
    this.tokenSubject.next(true); // 🔥 Met à jour le token en temps réel
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSubject.next(false); // 🔥 Met à jour l'état après déconnexion
  }
}
