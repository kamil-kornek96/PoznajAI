import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { ToastService } from 'src/app/services/toast.service';
import { toastTypes } from 'src/app/models/toast.model';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          visibility: 'hidden',
          bottom: '-200px',
        })
      ),
      state(
        'open',
        style({
          bottom: '20px',
        })
      ),
      transition('open <=> closed', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  progressInterval:any;
  timeDefault:number = 30;
  textClass: string = "";
  text: string = "";
  iconPath: string = "";

  constructor(public toastService: ToastService) {
    this.toastService.open.subscribe((data) => {
      if (data.show) {
        if(data.type == toastTypes.warn){
          this.textClass = "warn-text"
          this.text = "Ostrzeżenie!"
          this.iconPath = "assets/icons/toast-warn.svg"
        }
        else if(data.type == toastTypes.error){
          this.textClass = "error-text"
          this.text = "Błąd!"
          this.iconPath = "assets/icons/toast-error.svg"
        }
        else if(data.type == toastTypes.question){
          this.textClass = "question-text"
          this.text = "Czy wiesz że?"
          this.iconPath = "assets/icons/toast-question.svg"
        }
        else{
          this.textClass = "success-text"
          this.text = "Sukces!"
          this.iconPath = "assets/icons/toast-success.svg"
        }
        this.countDown();
      }
    });
  }

  ngOnInit() {}

countDown() {
  if (this.progressInterval === undefined) {
    this.progressInterval = setInterval(() => {
      const time = this.timeDefault;
      if (time <= 0) {
        this.toastService.hide();
        clearInterval(this.progressInterval);
        this.progressInterval = undefined;
        this.timeDefault = 30;
        this.textClass = "";
        this.text = "";
        this.iconPath = "";
        return;
      }

      this.timeDefault = time - 2;
    }, 150);
  }
}

stopCountDown() {
  if (this.progressInterval !== undefined) {
    clearInterval(this.progressInterval);
    this.progressInterval = undefined;
  }
}
}
