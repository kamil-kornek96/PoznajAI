import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,tap } from 'rxjs';
import { LessonDetailsModel } from '../lesson-page/models/lesson-details.model';
import { environment } from 'src/environments/environment';
import { LessonCreateModel } from '../lesson-edit-page/models/lesson-create.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSettingsHtml(): Observable<string> {
    const idToken = this.authService.getToken();
    const headers = idToken ? { Authorization: 'Bearer ' + idToken } : {};
    return this.http.get(`${this.apiUrl}/hangfire?token=${idToken}`,{ responseType: 'text' });
  }
}
