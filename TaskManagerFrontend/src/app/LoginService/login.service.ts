import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { User } from '../Intarfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = "/login";

  constructor(private http: HttpClient) { }

  login(credentials: {username: string, password: string}): Observable<User>{
    return this.http.post<User>(this.apiUrl, credentials).pipe(
      tap((user: User)=>{
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
