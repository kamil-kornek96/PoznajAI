import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'; // Add 'of' here
import { catchError, map, tap } from 'rxjs/operators'; // Add the necessary operators
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private apiUrl: string = environment.apiUrl;
  public isLoggedIn: boolean = false;
  public loggedUser?: UserModel;

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  setToken(token: string | null): void {
    if (token) {
      sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token');
    }
    this.tokenSubject.next(token);
  }

  checkAuth(): Observable<boolean> {
    if (!this.isLoggedIn) {
      const url = `${this.apiUrl}/user/check-auth`;
      return this.http.get<{ user: {result:UserModel}}>(url).pipe(
        tap(
          (response) => {
            console.log('Success:', response);
            this.isLoggedIn = true;
            this.loggedUser = response.user.result;
          },
          (error) => {
            console.error('Error:', error);
            this.isLoggedIn = false;
          }
        ),
        map(() => true),
        catchError(() => of(false)) 
      );
    } else {
      return of(true);
    }
  }

  login(user: LoginModel): Observable<any> {
    const url = `${this.apiUrl}/user/login`;
    return this.http.post(url, user);
  }

  register(user: RegisterModel): Observable<any> {
    const url = `${this.apiUrl}/user/register`;
    return this.http.post(url, user);
  }
}
