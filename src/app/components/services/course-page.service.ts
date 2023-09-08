import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseResponseModel } from '../courses-page/models/course-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursePageService {
    private apiUrl: string = environment.apiUrl;
    constructor(private http: HttpClient) { }

  getUserCourses(): Observable<CourseResponseModel> {
    return this.http.get<CourseResponseModel>(`${this.apiUrl}/Course/my-courses`);
  }

  createCourse(courseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Course/create`, courseData);
  }

}
