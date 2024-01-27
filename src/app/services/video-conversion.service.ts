import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoConversionService {
  private socket: WebSocket;
  private progressSubject: Subject<number> = new Subject<number>();

  constructor() {
    this.socket = new WebSocket('wss://localhost:44376/send');
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.progressSubject.next(data.progress);
    };
  }

  getProgress(): Observable<number> {
    return this.progressSubject.asObservable();
  }
}
