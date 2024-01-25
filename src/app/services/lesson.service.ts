import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LessonDetailsModel } from '../models/lesson-details.model';
import { LessonCreateModel } from '../models/lesson-create.model';

import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient,private toastr: ToastrService) { }

  getLessonById(lessonId: string): Observable<{data: LessonDetailsModel}> {
    return this.http.get<{data: LessonDetailsModel}>(`${this.apiUrl}/lesson/${lessonId}`);
  }

  createLesson(lessonData: LessonCreateModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/lesson/`, lessonData).pipe(
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
    return this.http.put(`${this.apiUrl}/lesson/${lessonData.id}`, lessonData).pipe(
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

  deleteLesson(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/lesson/${courseId}`).pipe(
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
