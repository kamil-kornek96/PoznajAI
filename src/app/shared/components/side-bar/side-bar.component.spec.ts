import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { SideBarComponent } from './side-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { UserModel } from 'src/app/models/user.model';
import { UserCoursesModel } from 'src/app/models/user-courses.model';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { NavHeaderComponent } from '../nav-header/nav-header.component';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let courseService: jasmine.SpyObj<CourseService>;
  let router: Router;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getUser', 'logout']);
    courseService = jasmine.createSpyObj('CourseService', ['getUserCourses']);

    TestBed.configureTestingModule({
      declarations: [SideBarComponent,NavHeaderComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'main-page/course-page', component: SideBarComponent }
      ])],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: CourseService, useValue: courseService }
      ],
    });

    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user courses on component initialization', fakeAsync(() => {
    const mockUserCourses: UserCoursesModel = { ownedCourses: [{title:'', description: '', id:'1', lessons: [], show: true}], allCourses: [] };
    courseService.getUserCourses.and.returnValue(of(mockUserCourses));

    fixture.detectChanges();
    tick();

    expect(component.userCourses).toEqual(mockUserCourses);
  }));

  it('should set active nav item on ngAfterViewInit', () => {
    const setActiveNavItemSpy = spyOn(component, 'setActiveNavItem');
    
    component.ngAfterViewInit();

    expect(setActiveNavItemSpy).toHaveBeenCalled();
  });
});
