import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'; 
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';
import { UserModel } from './models/user.model';
import { ToastService, toastTypes } from 'src/app/components/services/toast.service';

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
      const url = `${this.apiUrl}/user/check-auth`;
      return this.http.get<{ user:UserModel}>(url).pipe(
        tap(
          (response) => {
            this.isLoggedIn = true;
            this.loggedUser = response.user;
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
          this.toast.initiate({
            type: toastTypes.error,
            content: error.error.message
          });
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
          this.setToken(res.token)
          this.toast.initiate({
            type: toastTypes.success,
            content: res.message
          });
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
}
