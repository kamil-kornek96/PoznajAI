import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum toastTypes {
  error,
  success,
  warn,
  question,
}

export interface ToastData {
  content: string;
  show?: boolean;
  type: toastTypes;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  data: ToastData = { content: '' , type: toastTypes.success};
  timeDefault: number = 30;
  public open = new Subject<ToastData>();

  initiate(data: ToastData) {
    this.data = { ...data, show: true, };
    this.open.next(this.data);
  }

  hide() {
    this.data = { ...this.data, show: false };
    this.open.next(this.data);
  }
}
