import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LessonDetailsModel } from '../models/lesson-details.model';
import { LessonCreateModel } from '../models/lesson-create.model';

import { ToastService } from './toast.service';
import { toastTypes } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private toast: ToastService,
  ) {}

  getLessonById(lessonId: string): Observable<{ data: LessonDetailsModel }> {
    return this.http.get<{ data: LessonDetailsModel }>(
      `${this.apiUrl}/lesson/${lessonId}`,
    );
  }

  createLesson(lessonData: LessonCreateModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/lesson/`, lessonData).pipe(
      tap(
        (res: any) => {
          this.toast.initiate({
            type: toastTypes.success,
            content: 'Utworzono lekcję.',
          });
        },
        (error) => {
          this.toast.initiate({
            type: toastTypes.error,
            content: 'Podczas tworzenia lekcji wystąpił nieoczekiwany błąd.',
          });
        },
      ),
    );
  }

  updateLesson(lessonData: LessonDetailsModel): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/lesson/${lessonData.id}`, lessonData)
      .pipe(
        tap(
          (res: any) => {
            this.toast.initiate({
              type: toastTypes.success,
              content: 'Zaktualizowano lekcję.',
            });
          },
          (error) => {
            this.toast.initiate({
              type: toastTypes.error,
              content:
                'Podczas aktualizacji lekcji wystąpił nieoczekiwany błąd.',
            });
          },
        ),
      );
  }

  deleteLesson(courseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/lesson/${courseId}`).pipe(
      tap(
        (res: any) => {
          this.toast.initiate({
            type: toastTypes.success,
            content: 'Usunięto lekcję.',
          });
        },
        (error) => {
          this.toast.initiate({
            type: toastTypes.error,
            content: 'Podczas usuwania lekcji wystąpił nieoczekiwany błąd.',
          });
        },
      ),
    );
  }
}
