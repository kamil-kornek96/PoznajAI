import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LessonDetailsModel } from '../lesson-page/models/lesson-details.model';
import { environment } from 'src/environments/environment';
import { LessonCreateModel } from '../lesson-edit-page/models/lesson-create.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLessonById(lessonId: string): Observable<LessonDetailsModel> {
    return this.http.get<LessonDetailsModel>(`${this.apiUrl}/api/Lesson/${lessonId}`);
  }

  createLesson(lessonData: LessonCreateModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Lesson/create`, lessonData);
  }

  updateLesson(lessonData: LessonDetailsModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/Lesson/update/${lessonData.id}`, lessonData);
  }
}
