import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CourseModel } from '../models/course.model';
import { Router } from '@angular/router';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../../services/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-not-owned',
  templateUrl: './course-not-owned.component.html',
  styleUrls: ['./course-not-owned.component.scss']
})

export class CourseNotOwnedComponent {
  @Input() course: CourseModel | undefined;
  @Input() owned: boolean | undefined;
  faPencil = faPencil;
  faXmark = faXmark;


  constructor(private router: Router, public authService: AuthService, private courseService: CourseService, private toastr: ToastrService) {
    console.log(this.authService.loggedUser?.isAdmin)
  }


  editCourse(){
    if (this.course && this.course.id) {
      this.router.navigate(['main-page/edit-course', this.course.id]);
    }
  }

  deleteCourse(){
    if (this.course && this.course.id) {
      this.courseService.deleteCourse(this.course.id).subscribe(
        (response) => {
          if(this.course){
            this.course.show = false;
          }
        }
      );
    }
  }

  createLesson(){
    if (this.course && this.course.id) {
      this.router.navigate(['main-page/create-lesson', this.course.id]);
    }
  }
}