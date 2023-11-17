import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,tap,map } from 'rxjs';
import { LessonDetailsModel } from '../lesson-page/models/lesson-details.model';
import { environment } from 'src/environments/environment';
import { LessonCreateModel } from '../lesson-edit-page/models/lesson-create.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient,private toastr: ToastrService) { }

  getLessonById(lessonId: string): Observable<LessonDetailsModel> {
    return this.http.get<LessonDetailsModel>(`${this.apiUrl}/Lesson/${lessonId}`);
  }

  createLesson(lessonData: LessonCreateModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/Lesson/`, lessonData).pipe(
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

  updateLesson(lessonData: LessonDetailsModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/Lesson/${lessonData.id}`, lessonData).pipe(
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

  deleteLesson(courseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Lesson/${courseId}`).pipe(
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
}
