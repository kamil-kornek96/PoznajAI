import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ToastService, toastTypes } from 'src/app/components/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedIn implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toast: ToastService) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkAuth().pipe(
      take(1), // Take only one value, then complete the observable
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/login']);
          if(this.authService.loggedOut()){
            this.toast.initiate({
              type: toastTypes.success,
              content: "Wylogowano."
            });
          }
          localStorage.setItem('logoutMsg','false')
          return false;
        }
      })
    );
  }
}
