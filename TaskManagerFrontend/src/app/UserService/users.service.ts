import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Intarfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = "/user";

  constructor(private http: HttpClient) { }

  createUser(user: {username: string, password: string}): Observable<any>{
    return this.http.post(this.apiUrl, user);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
