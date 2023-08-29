import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}
  
  getToken(): string | null {
    return this.tokenSubject.value;
  }

  setToken(token: string | null): void {
    if (token) {
      localStorage.setItem('token', token); 
    } else {
      localStorage.removeItem('token'); 
    }
    this.tokenSubject.next(token);
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/user/login`;
    const body = { username, password };
    return this.http.post(url, body);
  }
  

  register(user: any): Observable<any> {
    const url = `${this.apiUrl}/user/register`;
    return this.http.post(url, user); 
  }
}
