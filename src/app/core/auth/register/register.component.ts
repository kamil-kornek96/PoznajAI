import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    // Wywołujemy metodę rejestracji z serwisu
    this.authService.register(this.username, this.password, this.email, this.firstName, this.lastName);
  }
}
