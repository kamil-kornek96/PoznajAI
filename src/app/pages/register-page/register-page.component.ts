import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModel } from 'src/app/models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  username: string = '';
  email: string = '';
  repeatEmail: string = '';
  password: string = '';
  repeatPassword: string = '';
  isChecked = false;
  rightClasses: string = "right";
  loaderClasses: string = "loader-container"
  isLoading: boolean = false;

  constructor(private authService: AuthService,private router: Router) {}

  async ngOnInit() {

  }

  loaderOn() {
    this.rightClasses = "right right-full";
    this.loaderClasses = "loader-container loader-center"
    this.isLoading = true;
  }

  loaderOff() {
    this.rightClasses = "right";
    this.loaderClasses = "loader-container"
    this.isLoading = false;
  }

  onSubmit(): void {
    this.loaderOn();
  
    var user: LoginModel = {
      username: this.username,
      password: this.password
    }
  
    this.authService.login(user).subscribe(
      (response) => {
        // Opóźnienie 0.5s przed przekierowaniem do strony głównej
        setTimeout(() => {
          this.authService.setToken(response.token);
          this.router.navigate(['/main-page']);
          this.loaderOff();
        }, 500);
      },
      (error) => {
        // Opóźnienie 0.5s przed zakończeniem ładowania w przypadku błędu
        setTimeout(() => {
          this.loaderOff();
        }, 500);
      }
    );
  }
  

}
