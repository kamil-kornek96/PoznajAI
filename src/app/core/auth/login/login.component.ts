import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginModel } from '../models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  onSubmit(): void {
    var user: LoginModel = {
      username: this.username,
      password: this.password
    }

    this.authService.login(user).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.authService.setToken(response.token)
        this.router.navigate(['/main-page']);
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
