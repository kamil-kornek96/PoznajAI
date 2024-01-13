import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModel } from 'src/app/models/login.model';
import { RegisterModel } from 'src/app/models/register.model';
import { toastTypes } from 'src/app/models/toast.model';

import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  register: RegisterModel = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }
  repeatEmail: string = '';
  repeatPassword: string = '';
  isChecked = false;
  @Input() loaderOn?: Function;
  @Input() loaderOff?: Function;
  @Input() isLogin: boolean = true;
  @Output() isLoginChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  emailInputStyle: string = "";
  passwordInputStyle: string = "";
  lastNameInputStyle: string = "";
  firstNameInputStyle: string = "";
  emailInputError: string = "";
  passwordInputError: string = "";
  lastNameInputError: string = "";
  firstNameInputError: string = "";

  constructor(private authService: AuthService,private router: Router, private toast: ToastService) {}

  login(){
    this.isLogin = true;
    this.isLoginChange.emit(this.isLogin);
  }

  validateEmail(){
    if(this.register.email != '' && this.register.email == this.repeatEmail){
      this.emailInputStyle = "";
      this.emailInputError = "";
      return true;
    }
    else{
      this.emailInputStyle = "error";
      this.emailInputError = "Adresy e-mail różnią się"
      return false;
    }
  }

  validatePassword(){
    if(this.register.password != '' && this.register.password == this.repeatPassword){
      this.passwordInputStyle = "";
      this.passwordInputError = "";
      return true;
    }
    else{
      this.passwordInputStyle = "error";
      this.passwordInputError = "Hasła różnią się"
      return false     
    }
  }

  validateFirstName(){
    if(this.register.firstName != ''){
      this.firstNameInputStyle = "";
      this.firstNameInputError = "";
      return true;
    }
    else{
      this.firstNameInputStyle = "error";
      this.firstNameInputError = "Imie nie może być puste"
      return false     
    }
  }

  validateLastName(){
    if(this.register.lastName != ''){
      this.lastNameInputStyle = "";
      this.lastNameInputError = "";
      return true;
    }
    else{
      this.lastNameInputStyle = "error";
      this.lastNameInputError = "Nazwisko nie może być puste"
      return false     
    }
  }

  onSubmit(): void {
    const validEmail = this.validateEmail();
    const validPassword = this.validatePassword();
    const validFirstName = this.validateFirstName();
    const validLastName = this.validateLastName();
    if(validEmail && validPassword){
      if(this.loaderOn)
      this.loaderOn();
    
  
    this.authService.register(this.register).subscribe(
      (response) => {
        // Opóźnienie 0.5s przed przekierowaniem do strony głównej
        setTimeout(() => {
          this.authService.setToken(response.token);
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
}
