import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authApiUrl = 'http://localhost:8080/api/auth';
  private userApiUrl = 'http://localhost:8080/api/users';
  private TOKEN_KEY = 'authToken';

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
          console.log("Token enregistré :", response.token);
        } else {
          console.error("Aucun token reçu !");
        }
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, `Bearer ${token}`);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    console.trace("📌 Token récupéré depuis le stockage :", token);
    if (!token) {
      console.warn("⚠️ Aucun token trouvé !");
    }
    return token;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

}
