import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent {
  faPencil = faPencil;
  @Input() lesson: any;
  @Input() owned: any;
  constructor(private router: Router) {}

  editLesson(){
    if (this.lesson && this.lesson.id) {
      this.router.navigate(['main-page/edit-lesson', this.lesson.id]);
    }
  }
}
