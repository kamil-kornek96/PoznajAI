import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/http/oauth.interceptor';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RegisterComponent } from './core/auth/register/register.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { CourseComponent } from './components/courses-page/course/course.component';
import { LessonComponent } from './components/courses-page/lesson/lesson.component';
import { LessonContentComponent } from './components/lesson-page/lesson-content.component';
import { QuillModule } from 'ngx-quill';
import { QuillConfigModule } from 'ngx-quill/config';
import { CourseNotOwnedComponent } from './components/courses-page/course-not-owned/course-not-owned.component';
import { CoursesEditPageComponent } from './components/courses-edit-page/courses-edit-page.component';
import { LessonEditPageComponent } from './components/lesson-edit-page/lesson-edit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    SideBarComponent,
    CoursesPageComponent,
    CourseComponent,
    LessonComponent,
    LessonContentComponent,
    CourseNotOwnedComponent,
    CoursesEditPageComponent,
    LessonEditPageComponent,
  ],
  imports: [
    BrowserModule,
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
    ToastrModule.forRoot(),
    QuillModule.forRoot(),
    QuillConfigModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
      
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
      
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],
      
          ['clean'],                                         // remove formatting button
      
          ['link', 'image', 'video']                         // link and image, video
        ]}}),
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
