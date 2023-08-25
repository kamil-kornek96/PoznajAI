import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
    // Pobierz token z lokalnego magazynu (localStorage, sessionStorage) przy inicjalizacji
    const token = localStorage.getItem('token'); // Możesz dostosować do swoich potrzeb
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  setToken(token: string | null): void {
    // Zapisz token w lokalnym magazynie (localStorage, sessionStorage) i zaktualizuj BehaviorSubject
    if (token) {
      localStorage.setItem('token', token); // Możesz dostosować do swoich potrzeb
    } else {
      localStorage.removeItem('token'); // Możesz dostosować do swoich potrzeb
    }
    this.tokenSubject.next(token);
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    const body = { username, password };
    return this.http.post(url, body);
  }

  register(user: any): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;
    return this.http.post(url, user);
  }
}
