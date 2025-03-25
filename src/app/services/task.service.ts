import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap} from 'rxjs';
import { UserService } from './user.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/api/tasks';

  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {}

  getTasks(): Observable<any[]> {
      const token = this.userService.getToken();
      
      if (!token) {
        console.warn("⚠️ Aucun token disponible, requête annulée !");
        return new Observable<any[]>(); // Retourne un observable vide
      }
    
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      });
    
      return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
        tap(tasks => this.tasksSubject.next(tasks)) // Mise à jour du BehaviorSubject
      );
    }


    addTask(task: { title: string; description: string; priority: string }): Observable<any> {
      const token = this.userService.getToken();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token || ''
      });
    
      return this.http.post<any>(this.apiUrl, task, { headers }).pipe(
        tap(newTask => {
          const currentTasks = this.tasksSubject.getValue();
          this.tasksSubject.next([...currentTasks, newTask]); // Ajout à la liste locale
        })
      );
    }
  
  updateTask(task: any) {
    const token = this.userService.getToken(); // Récupère le token
    console.log(token)
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token || ''
    });
    return this.http.put<any>(`${this.apiUrl}/${task.id}`, task, { headers });
  }

  deleteTask(taskId: number) {
    const token = this.userService.getToken();
    console.log("🛠️ Token récupéré :", token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token || ''
    });

    return this.http.delete(`${this.apiUrl}/${taskId}`, { headers });
  }
  
  getTaskById(taskId: number): Observable<Task> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token || ''
    });
  
    return this.http.get<Task>(`${this.apiUrl}/${taskId}`, { headers });
  }  
}