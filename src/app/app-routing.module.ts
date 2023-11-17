import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { AuthGuardLoggedIn } from './core/auth/auth-logged-in.guard';
import { AuthGuardNotLoggedIn } from './core/auth/auth-not-logged-in.guard';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { LessonContentComponent } from './components/lesson-page/lesson-content.component';
import { CoursesEditPageComponent } from './components/courses-edit-page/courses-edit-page.component';
import { LessonEditPageComponent } from './components/lesson-edit-page/lesson-edit-page.component';
import { SettingsPageComponent } from './components/settings/settings.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardNotLoggedIn] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuardNotLoggedIn] },
  {
    path: 'main-page',
    component: MainPageComponent,
    canActivate: [AuthGuardLoggedIn],
    children: [
      { path: '', redirectTo: 'course-page', pathMatch: 'full' }, // Domyślna trasa
      { path: 'course-page', component: CoursesPageComponent },
      { path: 'lesson/:id', component: LessonContentComponent },
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
