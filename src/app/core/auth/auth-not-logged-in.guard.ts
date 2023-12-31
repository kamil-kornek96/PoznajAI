import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardNotLoggedIn implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkAuth().pipe(
      take(1), // Take only one value, then complete the observable
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['/main-page']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
