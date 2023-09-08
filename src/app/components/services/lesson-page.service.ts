import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseResponseModel } from '../courses-page/models/course-response.model';
import { environment } from 'src/environments/environment';
import { LessonDetailsModel } from '../lesson-page/models/lesson-details.model';

@Injectable({
  providedIn: 'root'
})
export class LessonPageService {
    private apiUrl: string = environment.apiUrl;
    constructor(private http: HttpClient) { }

  getLessonById(lessonId: string): Observable<LessonDetailsModel> {
    return this.http.get<LessonDetailsModel>(`${this.apiUrl}/Lesson/${lessonId}`);
  }

  createLesson(lessonData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Lesson/create`, lessonData);
  }

}
