import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavHeaderComponent } from './nav-header.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/user.model';

describe('NavHeaderComponent', () => {
  let component: NavHeaderComponent;
  let fixture: ComponentFixture<NavHeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['logout']);

    TestBed.configureTestingModule({
      declarations: [NavHeaderComponent],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    });

    fixture = TestBed.createComponent(NavHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown classes on toggleDropdown', () => {
    expect(component.chevronClass).toBe('nav-chevron-down');
    expect(component.navHeaderWrapperClass).toBe('nav-header-wrapper');

    component.toogleDropdown();

    expect(component.chevronClass).toBe('nav-chevron-down rotate-180');
    expect(component.navHeaderWrapperClass).toBe('nav-header-wrapper expand');

    component.toogleDropdown();

    expect(component.chevronClass).toBe('nav-chevron-down');
    expect(component.navHeaderWrapperClass).toBe('nav-header-wrapper');
  });

  it('should call authService.logout on Logout', () => {
    component.Logout();
    expect(authService.logout).toHaveBeenCalled();
  });


});
