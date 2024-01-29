import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { ToastComponent } from './shared/components/toast/toast.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './http/oauth.interceptor';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { LessonComponent } from './shared/components/lesson/lesson.component';
import { LessonPageComponent } from './pages/lesson-page/lesson-page.component';
import { QuillModule } from 'ngx-quill';
import { QuillConfigModule } from 'ngx-quill/config';
import { CourseComponent } from './shared/components/course/course.component';
import { CoursesEditPageComponent } from './pages/courses-edit-page/courses-edit-page.component';
import { LessonEditPageComponent } from './pages/lesson-edit-page/lesson-edit-page.component';
import { FileUploadComponent } from './shared/components/file-upload/file-upload.component';
import { VideoPlayerComponent } from './shared/components/video-player/video-player.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { HubConnectionService } from './services/hub-connection.service';
import { InputComponent } from './shared/components/input/input.component';
import { CheckboxComponent } from './shared/components/checkbox/checkbox.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { NavHeaderComponent } from './shared/components/nav-header/nav-header.component';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { RegisterFormComponent } from './shared/components/register-form/register-form.component';
import { ActivationPageComponent } from './pages/activation-page/activation-page.component';
import { GradientCardComponent } from './shared/components/gradient-card/gradient-card.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    ActivationPageComponent,
    MainPageComponent,
    SideBarComponent,
    CoursesPageComponent,
    CourseComponent,
    LessonComponent,
    LessonPageComponent,
    CoursesEditPageComponent,
    LessonEditPageComponent,
    FileUploadComponent,
    VideoPlayerComponent,
    SettingsPageComponent,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    ToastComponent,
    NavHeaderComponent,
    LoginFormComponent,
    RegisterFormComponent,
    GradientCardComponent,
  ],
  imports: [
    FileUploadModule,
    BrowserModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatExpansionModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
    }),
    QuillModule.forRoot(),
    QuillConfigModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],

          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],

          ['clean'],

          ['link', 'image', 'video'],
        ],
      },
    }),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    HubConnectionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
