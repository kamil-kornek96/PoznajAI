import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { UserCoursesModel } from '../models/user-courses.model';
import { CourseUpdateModel } from '../models/course-update.model';

import { ToastrService } from 'ngx-toastr';
import { CourseModel } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getUserCourses(): Observable<{ data: UserCoursesModel }> {
    return this.http
      .get<{ data: UserCoursesModel }>(`${this.apiUrl}/user/courses`)
      .pipe(
        map((res: { data: UserCoursesModel }) => {
          res.data.allCourses.forEach((c) => {
            c.lessons.forEach((l) => (l.show = true));
            c.show = true;
          });
          res.data.ownedCourses.forEach((c) => {
            c.lessons.forEach((l) => (l.show = true));
            c.show = true;
          });
          return res;
        }),
      );
  }

  createCourse(courseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/course`, courseData).pipe(
      tap(
        (res: any) => {
          this.toastr.success(res.message);
        },
        (error) => {
          this.toastr.error(error.error.message);
        },
      ),
    );
  }

  getCourseToUpdate(courseId: string): Observable<{ data: CourseUpdateModel }> {
    return this.http.get<{ data: CourseUpdateModel }>(
      `${this.apiUrl}/course/${courseId}`,
    );
  }

  updateCourse(courseData: CourseUpdateModel): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/course/${courseData.id}`, courseData)
      .pipe(
        tap(
          (res: any) => {
            this.toastr.success(res.message);
          },
          (error) => {
            this.toastr.error(error.error.message);
          },
        ),
      );
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/course/${courseId}`).pipe(
      tap(
        (res: any) => {
          this.toastr.success(res.message);
        },
        (error) => {
          this.toastr.error(error.error.message);
        },
      ),
    );
  }

  getCourseById(courseId: string): Observable<{ data: CourseModel }> {
    return this.http.get<{ data: CourseModel }>(
      `${this.apiUrl}/course/${courseId}`,
    );
  }
}
