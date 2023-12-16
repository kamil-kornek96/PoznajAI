import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

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
