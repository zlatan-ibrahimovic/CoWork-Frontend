import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/api/tasks';
  constructor(private http: HttpClient, private userService: UserService) {}

  getTasks(): Observable<any[]> {
    console.log('📡 Appel de getTasks()');
    const token = this.userService.getToken();
    console.log('🔎 Token récupéré pour requête :', token);
  
    if (!token) {
      console.warn("⚠️ Aucun token disponible, requête annulée !");
      return new Observable<any[]>();
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token  // Ajout du token dans l'en-tête
    });
  
    console.log("🔍 Envoi du token avec la requête :", headers);
  
    return this.http.get<any[]>(this.apiUrl, { headers });  // Ajout des headers ici
  }

  addTask(task: { title: string; description: string; priority: string }): Observable<any> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token || ''
    });
  
    return this.http.post<any>(this.apiUrl, task, { headers });
  }
  
}  
