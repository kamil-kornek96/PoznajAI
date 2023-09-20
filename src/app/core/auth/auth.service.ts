import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'; // Add 'of' here
import { catchError, map, tap } from 'rxjs/operators'; // Add the necessary operators
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';
import { UserModel } from './models/user.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private apiUrl: string = environment.apiUrl;
  public isLoggedIn: boolean = false;
  public loggedUser?: UserModel;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

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
            console.log('Success:', response);
            this.isLoggedIn = true;
            this.loggedUser = response.user;
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
    return this.http.post(url, user).pipe(
      tap(
        (res:any) => {
          console.log({res})
          this.toastr.success(res.message);
        },
        (error) => {
          console.log({error})
          this.toastr.error(error.error.message);
        }
      )
    );
  }

  register(user: RegisterModel): Observable<any> {
    const url = `${this.apiUrl}/user/register`;
    return this.http.post(url, user).pipe(
      tap(
        (res:any) => {
          console.log({res})
          this.setToken(res.token)
          this.toastr.success('Zarejestrowano pomyślnie', 'Sukces');
        },
        (error) => {
          this.toastr.error('Błąd rejestracji: ' + error.error.message, 'Błąd');
        }
      )
    );
  }
}
