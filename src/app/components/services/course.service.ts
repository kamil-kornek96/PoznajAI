import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseResponseModel } from '../courses-page/models/course-response.model';
import { environment } from 'src/environments/environment';
import { CourseUpdateModel } from '../courses-edit-page/models/course-update.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

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
    return this.http.post(`${this.apiUrl}/Course`, courseData);
  }

  getCourseToUpdate(courseId: string): Observable<CourseUpdateModel> {
    return this.http.get<CourseUpdateModel>(`${this.apiUrl}/Course/${courseId}`);
  }

  updateCourse(courseData: CourseUpdateModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/Course/${courseData.id}`, courseData);
  }

  deleteCourse(courseId: string): Observable<any> {
    console.log(`${this.apiUrl}/Course/${courseId}`,courseId)
    return this.http.delete(`${this.apiUrl}/Course/${courseId}`);
  }

  getCourseById(courseId: string): Observable<CourseResponseModel> {
    return this.http.get<CourseResponseModel>(`${this.apiUrl}/Course/${courseId}`);
  }
}
