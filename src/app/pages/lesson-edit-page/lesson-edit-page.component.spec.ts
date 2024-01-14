import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonEditPageComponent } from './lesson-edit-page.component';
import { AuthService } from 'src/app/services/auth.service';
import { LessonService } from 'src/app/services/lesson.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuillModule } from 'ngx-quill';
import { VideoPlayerComponent } from 'src/app/shared/components/video-player/video-player.component';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
import { ReactiveFormsModule } from '@angular/forms'; // Add this import

describe('LessonEditPageComponent', () => {
  let component: LessonEditPageComponent;
  let fixture: ComponentFixture<LessonEditPageComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let lessonServiceSpy: jasmine.SpyObj<LessonService>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getSettingsHtml']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['getSettingsHtml']);
    lessonServiceSpy = jasmine.createSpyObj('LessonService', ['getSettingsHtml']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], { paramMap: of({ lessonId: '1', courseId: '2' }) });

    TestBed.configureTestingModule({
      declarations: [LessonEditPageComponent, VideoPlayerComponent, FileUploadComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: LessonService, useValue: lessonServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ],
      imports: [HttpClientModule, FontAwesomeModule, QuillModule.forRoot(), ReactiveFormsModule], // Add ReactiveFormsModule here
    });

    fixture = TestBed.createComponent(LessonEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
