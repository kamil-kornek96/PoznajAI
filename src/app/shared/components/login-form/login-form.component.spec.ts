import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginFormComponent } from './login-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModel } from 'src/app/models/login.model';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { CustomCheckboxComponent } from '../custom-checkbox/custom-checkbox.component';
import { CustomButtonComponent } from '../custom-button/custom-button.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'setToken']);
    
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent,CustomInputComponent,CustomCheckboxComponent,CustomButtonComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit isLoginChange event when register is called', () => {
    const isLoginChangeSpy = spyOn(component.isLoginChange, 'emit');

    component.register();

    expect(component.isLogin).toBeFalse();
    expect(isLoginChangeSpy).toHaveBeenCalledWith(false);
  });

  it('should navigate to /main-page after successful login', fakeAsync(() => {
    authService.login.and.returnValue(of({ token: 'fakeToken' }));
    const routerNavigateSpy = spyOn(router, 'navigate');
    
    component.onSubmit();
    tick(501); // Advance time to ensure the delayed function is executed

    expect(authService.login).toHaveBeenCalledWith(component.login);
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/main-page']);
  }));

  it('should navigate to /main-page after successful login', fakeAsync(() => {
    authService.login.and.returnValue(of({ token: 'fakeToken' }));
    const routerNavigateSpy = spyOn(router, 'navigate');
    
    component.onSubmit();
    tick(501); // Advance time to ensure the delayed function is executed

    expect(authService.login).toHaveBeenCalledWith(component.login);
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/main-page']);
}));

  it('should call loaderOff after failed login', fakeAsync(() => {
    authService.login.and.returnValue(throwError('Fake error'));
    const loaderOffSpy = jasmine.createSpy('loaderOffSpy');
    
    component.loaderOff = loaderOffSpy;

    component.onSubmit();
    tick(501); // Advance time to ensure the delayed function is executed

    expect(loaderOffSpy).toHaveBeenCalled();
  }));
});
