import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<CourseResponseModel>(`${this.apiUrl}/api/Course/my-courses`);
  }

  createCourse(courseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Course/create`, courseData);
  }

  getCourseToUpdate(courseId: string): Observable<CourseUpdateModel> {
    return this.http.get<CourseUpdateModel>(`${this.apiUrl}/api/Course/${courseId}`);
  }

  updateCourse(courseData: CourseUpdateModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/Course/update/${courseData.id}`, courseData);
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/Course/${courseId}`);
  }

  getCourseById(courseId: string): Observable<CourseResponseModel> {
    return this.http.get<CourseResponseModel>(`${this.apiUrl}/api/Course/${courseId}`);
  }
}
