import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { LessonService } from 'src/app/services/lesson.service';
import { LessonComponent } from './lesson.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LessonComponent', () => {
  let component: LessonComponent;
  let fixture: ComponentFixture<LessonComponent>;
  let lessonServiceSpy: jasmine.SpyObj<LessonService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    lessonServiceSpy = jasmine.createSpyObj('LessonService', ['deleteLesson']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      declarations: [LessonComponent],
      imports: [RouterTestingModule, FontAwesomeModule,MatCardModule, BrowserAnimationsModule],
      providers: [
        { provide: LessonService, useValue: lessonServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
    });

    fixture = TestBed.createComponent(LessonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to edit-lesson when editLesson is called with a valid lesson', () => {
    component.lesson = { id: 1, /* other properties */ };
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.editLesson();

    expect(navigateSpy).toHaveBeenCalledWith(['main-page/edit-lesson', 1]);
  });

  it('should not navigate when editLesson is called with an invalid lesson', () => {
    component.lesson = null;
    component.editLesson();
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');

    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should delete lesson and navigate to main-page when deleteLesson is called with a valid lesson', () => {
    component.lesson = { id: 1, show: true /* other properties */ };
    lessonServiceSpy.deleteLesson.and.returnValue(of({}));
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.deleteLesson();

    expect(lessonServiceSpy.deleteLesson).toHaveBeenCalledWith(1);
    expect(component.lesson.show).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['main-page']);
  });

  it('should show toastr error when deleteLesson encounters an error', () => {
    component.lesson = { id: 1 /* other properties */ };
    lessonServiceSpy.deleteLesson.and.returnValue(throwError('Some error'));

    component.deleteLesson();

    expect(toastrSpy.error).toHaveBeenCalledWith(
      'An error occurred while deleting the lesson',
      'Error'
    );
  });
});
