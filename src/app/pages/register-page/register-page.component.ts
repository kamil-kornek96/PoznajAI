import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterModel } from 'src/app/models/register.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  registrationForm: FormGroup;
  passwordMismatch: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

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
      const user:RegisterModel = {
        username: this.registrationForm.value.username,
        password: this.registrationForm.value.password,
        email: this.registrationForm.value.email,
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName
      };
  
      this.authService.register(user).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.authService.setToken(response.token)
        },
        (error) => {
          console.error('Registration error:', error);
        }
      );
    }
  }
}
