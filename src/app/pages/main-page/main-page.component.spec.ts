import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SideBarComponent } from 'src/app/shared/components/side-bar/side-bar.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { NavHeaderComponent } from 'src/app/shared/components/nav-header/nav-header.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getSettingsHtml']);
    const toastServiceSpy = jasmine.createSpyObj('ToastrService', ['getSettingsHtml']);
    TestBed.configureTestingModule({
      declarations: [MainPageComponent, SideBarComponent, NavHeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastrService, useValue: toastServiceSpy }
      ],
      imports: [HttpClientModule, RouterModule.forRoot([])],  // Add RouterModule here
    });

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set "logoutMsg" in localStorage to "false" on initialization', () => {

    fixture.detectChanges();

    expect(localStorage.getItem('logoutMsg')).toBe('false');
  });
});
