import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedIn implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkAuth().pipe(
      take(1), // Take only one value, then complete the observable
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/login']);
          if(this.authService.loggedOut()){
            this.toastr.success('Wylogowano.')
          }
          localStorage.setItem('logoutMsg','false')
          return false;
        }
      })
    );
  }
}
