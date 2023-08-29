import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = sessionStorage.getItem('token');

    // Jeśli jest token, dodaj też nagłówek autoryzacji
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}