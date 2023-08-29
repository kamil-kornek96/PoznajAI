import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'; // Importujemy FormBuilder i inne potrzebne klasy
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup; // Definiujemy FormGroup dla formularza rejestracji
  passwordMismatch: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    // Inicjalizacja formularza w konstruktorze
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]], // Minimalna długość hasła
      confirmPassword: ['', Validators.required], // Potwierdzenie hasła
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    }); // Dodajemy dodatkowy walidator dla potwierdzenia hasła
  }

  // Walidator dla potwierdzenia hasła
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
    }
  }

  onSubmit(): void {
    this.passwordMatchValidator(this.registrationForm);
  
    if (this.registrationForm.valid) {
      const user = {
        username: this.registrationForm.value.username,
        password: this.registrationForm.value.password,
        email: this.registrationForm.value.email,
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName
      };
  
      this.authService.register(user).subscribe(
        (response) => {
          console.log('Registration successful:', response);
        },
        (error) => {
          console.error('Registration error:', error);
        }
      );
    }
  }
}
