import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { CourseResponseModel } from '../models/course-response.model';
import { CourseUpdateModel } from '../models/course-update.model';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getUserCourses(): Observable<CourseResponseModel> {
    return this.http.get<CourseResponseModel>(`${this.apiUrl}/Course/my-courses`)
      .pipe(
        map((res: CourseResponseModel) => {
          res.allCourses.forEach(c => {
            c.lessons.forEach(l => l.show = true)
            c.show = true
          });
          res.ownedCourses.forEach(c => {
            c.lessons.forEach(l => l.show = true)
            c.show = true
          });
          return res;
        })
      );
  }

  createCourse(courseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Course`, courseData).pipe(
      tap(
        (res:any) => {
          this.toastr.success(res.message);
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      )
    );;
  }

  getCourseToUpdate(courseId: string): Observable<CourseUpdateModel> {
    return this.http.get<CourseUpdateModel>(`${this.apiUrl}/Course/${courseId}`);
  }

  updateCourse(courseData: CourseUpdateModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/Course/${courseData.id}`, courseData).pipe(
      tap(
        (res:any) => {
          this.toastr.success(res.message);
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      )
    );
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Course/${courseId}`).pipe(
      tap(
        (res:any) => {
          this.toastr.success(res.message);
        },
        (error) => {
          //this.toastr.error(error.error.message);
        }
      )
    );
  }

  getCourseById(courseId: string): Observable<CourseResponseModel> {
    return this.http.get<CourseResponseModel>(`${this.apiUrl}/Course/${courseId}`);
  }
}
