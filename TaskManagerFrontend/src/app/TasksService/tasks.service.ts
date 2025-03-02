import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Intarfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl: string = "/tasks";

  constructor(private http: HttpClient) { }

  getTasks(user_id: number): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.apiUrl}?user_id=${user_id}`);
  }

  createTask(task: {user_id: number, title: string, description: string, status: string}): Observable<any>{
    return this.http.post(this.apiUrl, task);
  }

  editTask(id: number, task: {title: string, description: string, status: string}): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
