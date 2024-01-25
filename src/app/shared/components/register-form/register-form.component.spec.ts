import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { RegisterFormComponent } from './register-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { RegisterModel } from 'src/app/models/register.model';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { CustomButtonComponent } from '../custom-button/custom-button.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['register', 'setToken']);
    toastService = jasmine.createSpyObj('ToastService', ['show']);
    
    TestBed.configureTestingModule({
      declarations: [RegisterFormComponent, CustomInputComponent, CustomButtonComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: ToastService, useValue: toastService }
      ],
    });

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email correctly', () => {
    // Test case where email is valid
    component.register.email = 'test@example.com';
    component.repeatEmail = 'test@example.com';
    expect(component.validateEmail()).toBe(true);

    // Test case where email is invalid
    component.repeatEmail = 'invalid@example.com';
    expect(component.validateEmail()).toBe(false);
  });

  it('should validate password correctly', () => {
    // Test case where password is valid
    component.register.password = 'password123';
    component.repeatPassword = 'password123';
    expect(component.validatePassword()).toBe(true);

    // Test case where password is invalid
    component.repeatPassword = 'invalidPassword';
    expect(component.validatePassword()).toBe(false);
  });

  it('should validate first name correctly', () => {
    // Test case where first name is valid
    component.register.firstName = 'John';
    expect(component.validateFirstName()).toBe(true);

    // Test case where first name is invalid
    component.register.firstName = '';
    expect(component.validateFirstName()).toBe(false);
  });

  it('should validate last name correctly', () => {
    // Test case where last name is valid
    component.register.lastName = 'Doe';
    expect(component.validateLastName()).toBe(true);

    // Test case where last name is invalid
    component.register.lastName = '';
    expect(component.validateLastName()).toBe(false);
  });
  
});
