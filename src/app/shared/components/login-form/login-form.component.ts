import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModel } from 'src/app/models/login.model';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  login: LoginModel = {email: '', password: ''};
  isChecked = false;
  @Input() loaderOn?: Function;
  @Input() loaderOff?: Function;
  @Input() isLogin: boolean = true;
  @Output() isLoginChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authService: AuthService,private router: Router) {}

  


  register(){
    this.isLogin = false;
    this.isLoginChange.emit(this.isLogin)
  }

  onSubmit(): void {
    if(this.loaderOn)
      this.loaderOn();
  
    this.authService.login(this.login).subscribe(
      (response) => {
        // Opóźnienie 0.5s przed przekierowaniem do strony głównej
        setTimeout(() => {
          this.authService.setToken(response.data.token);
          this.router.navigate(['/main-page']);
          if(this.loaderOff)
            this.loaderOff();
        }, 500);
      },
      (error) => {
        // Opóźnienie 0.5s przed zakończeniem ładowania w przypadku błędu
        setTimeout(() => {
          if(this.loaderOff)
            this.loaderOff();
        }, 500);
      }
    );
  }
}
