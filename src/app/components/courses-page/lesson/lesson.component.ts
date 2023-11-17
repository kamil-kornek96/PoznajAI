import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { LessonService } from '../../services/lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent {
  faPencil = faPencil;
  faXmark = faXmark;
  @Input() lesson: any;
  @Input() owned: any;
  constructor(private router: Router, private lessonService: LessonService, private toastr: ToastrService) {}

  editLesson(){
    if (this.lesson && this.lesson.id) {
      this.router.navigate(['main-page/edit-lesson', this.lesson.id]);
    }
  }

  deleteLesson(){
    if (this.lesson && this.lesson.id) {
      this.lessonService.deleteLesson(this.lesson.id).subscribe(
        (response) => {
          if(this.lesson){
            this.lesson.show = false;
            this.router.navigate(['main-page']);
          }
        },
        (error) => {
          this.toastr.error(
            'An error occurred while deleting the lesson',
            'Error'
          );
        }
      );
    }
  }
}
