import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginModel } from '../models/login.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService,private router: Router, private toastr: ToastrService) {}

  onSubmit(): void {
    this.isLoading = true;
    var user: LoginModel = {
      username: this.username,
      password: this.password
    }

    this.authService.login(user).subscribe(
      (response) => {
        console.log({response})
        this.authService.setToken(response.token)
        this.router.navigate(['/main-page']);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

}
