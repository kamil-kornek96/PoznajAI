import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { CourseModel } from 'src/app/models/course.model';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { CourseNotOwnedComponent } from './course-not-owned.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('CourseNotOwnedComponent', () => {
  let component: CourseNotOwnedComponent;
  let fixture: ComponentFixture<CourseNotOwnedComponent>;
  let authService: any;
  let courseService: CourseService;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseNotOwnedComponent],
      imports: [FontAwesomeModule, RouterTestingModule, HttpClientModule,ToastrModule.forRoot()],
      providers: [AuthService, CourseService, ToastrService],
    });

    fixture = TestBed.createComponent(CourseNotOwnedComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    courseService = TestBed.inject(CourseService);
    toastrService = TestBed.inject(ToastrService);

    // Mocking the authService.isAuthenticated method
    spyOn(authService, 'checkAuth').and.returnValue(true);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to edit-course when editCourse is called', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.course = { id: '1', show: true } as CourseModel;
    component.editCourse();
    expect(routerSpy).toHaveBeenCalledWith(['main-page/edit-course', '1']);
  });

  it('should delete the course when deleteCourse is called', () => {
    spyOn(courseService, 'deleteCourse').and.returnValue(of({}));

    component.course = { id: '1', show: true } as CourseModel;
    component.deleteCourse();

    expect(courseService.deleteCourse).toHaveBeenCalledWith('1');
    expect(component.course?.show).toBeFalsy();
  });

  it('should navigate to create-lesson when createLesson is called', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.course = { id: '1', show: true } as CourseModel;
    component.createLesson();
    expect(routerSpy).toHaveBeenCalledWith(['main-page/create-lesson', '1']);
  });
});
