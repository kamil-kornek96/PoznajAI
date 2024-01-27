import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';

import { CourseModel } from 'src/app/models/course.model';

import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  @Input() course: CourseModel | undefined;
  @Input() owned: boolean | undefined;
  faPencil = faPencil;
  faXmark = faXmark;

  constructor(
    private router: Router,
    public authService: AuthService,
    private courseService: CourseService,
    private toastr: ToastrService,
  ) {}

  editCourse() {
    if (this.course && this.course.id) {
      this.router.navigate(['main-page/edit-course', this.course.id]);
    }
  }

  deleteCourse() {
    if (this.course && this.course.id) {
      this.courseService.deleteCourse(this.course.id).subscribe(
        (response) => {
          if (this.course) {
            this.course.show = false;
          }
        },
        (error) => {
          this.toastr.error(
            'An error occurred while deleting the course',
            'Error',
          );
        },
      );
    }
  }

  createLesson() {
    if (this.course && this.course.id) {
      this.router.navigate(['main-page/create-lesson', this.course.id]);
    }
  }
}
