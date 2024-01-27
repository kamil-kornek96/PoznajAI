import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'; 
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { UserModel } from '../models/user.model';

import { ToastService } from './toast.service';
import { toastTypes } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private apiUrl: string = environment.apiUrl;
  public isLoggedIn: boolean = false;
  public loggedUser?: UserModel;

  constructor(private http: HttpClient, private toast: ToastService) {}

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
      const url = `${this.apiUrl}/user/auth`;
      return this.http.get<{ data:UserModel}>(url).pipe(
        tap(
          (response) => {
            console.log(response)
            this.isLoggedIn = true;
            this.loggedUser = response.data;
          },
          (error) => {
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
    return this.http.post(url, user).pipe(
      tap(
        (res:any) => {
          this.toast.initiate({
            type: toastTypes.success,
            content: res.message
          });
        },
        (error) => {
          if(error.error.message == "Account not activated"){
            this.toast.initiate({
              type: toastTypes.error,
              content: "Konto nie zostało aktywowane. Sprawdź email."
            });
          }
          else{
            this.toast.initiate({
              type: toastTypes.error,
              content: "Niepoprawna nazwa użytkownika i/lub hasło."
            });
          }
        }
      )
    );
  }

  logout(){
    localStorage.setItem('logoutMsg', 'true');
    this.setToken(null)
  }

  loggedOut(){
    return localStorage.getItem('logoutMsg') == 'true' ? true : false;
  }

  register(user: RegisterModel): Observable<any> {
    const url = `${this.apiUrl}/user/register`;
    return this.http.post(url, user).pipe(
      tap(
        (res:any) => {
        },
        (error) => {
          this.toast.initiate({
            type: toastTypes.error,
            content: error.error.message
          });
        }
      )
    );
  }

  activateEmail(token: string): Observable<any> {
    const url = `${this.apiUrl}/user/activate`;
    console.log(url)
    return this.http.post(url, {token });
  }
  
}
