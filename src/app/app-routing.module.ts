import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthGuardLoggedIn } from './guards/auth-logged-in.guard';
import { AuthGuardNotLoggedIn } from './guards/auth-not-logged-in.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { LessonPageComponent } from './pages/lesson-page/lesson-page.component';
import { CoursesEditPageComponent } from './pages/courses-edit-page/courses-edit-page.component';
import { LessonEditPageComponent } from './pages/lesson-edit-page/lesson-edit-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [AuthGuardNotLoggedIn] },
  { path: 'register', component: RegisterPageComponent, canActivate: [AuthGuardNotLoggedIn] },
  {
    path: 'main-page',
    component: MainPageComponent,
    canActivate: [AuthGuardLoggedIn],
    children: [
      { path: '', redirectTo: 'course-page', pathMatch: 'full' },
      { path: 'course-page', component: CoursesPageComponent },
      { path: 'lesson/:id', component: LessonPageComponent },
      { path: 'create-lesson/:courseId', component: LessonEditPageComponent },
      { path: 'edit-lesson/:lessonId', component: LessonEditPageComponent },
      { path: 'edit-course/:id', component: CoursesEditPageComponent },
      { path: 'create-course', component: CoursesEditPageComponent },
      { path: 'settings', component: SettingsPageComponent}
    ]
  },
  { path: '', redirectTo: '/main-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
