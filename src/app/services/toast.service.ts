import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ToastModel, toastTypes } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  data: ToastModel = { content: '', type: toastTypes.success };
  timeDefault: number = 30;
  public open = new Subject<ToastModel>();

  initiate(data: ToastModel) {
    this.data = { ...data, show: true };
    this.open.next(this.data);
  }

  hide() {
    this.data = { ...this.data, show: false };
    this.open.next(this.data);
  }
}
