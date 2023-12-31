import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CourseModel } from '../models/course.model';
import { Router } from '@angular/router';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../../services/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent {
  @Input() course: CourseModel | undefined;
  @Input() owned: boolean | undefined;
  faPencil = faPencil;
  faXmark = faXmark;
  


  constructor(private router:Router,public authService: AuthService,private courseService: CourseService, private toastr: ToastrService,) {
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
          console.log('Course deleted successfully', response);
          if(this.course){
            this.course.show = false;
          }
        },
        (error) => {
          console.error('Error deleting the course', error);
          this.toastr.error(
            'An error occurred while deleting the course',
            'Error'
          );
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
