import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CourseModel } from '../models/course.model';
import { Router } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent {
  @Input() course: CourseModel | undefined;
  @Input() owned: boolean | undefined;
  faPencil = faPencil;
  


  constructor(private router:Router,public authService: AuthService) {
  }

  editCourse(){
    if (this.course && this.course.id) {
      this.router.navigate(['main-page/edit-course', this.course.id]);
    }
  }

  createLesson(){
    if (this.course && this.course.id) {
      this.router.navigate(['main-page/create-lesson', this.course.id]);
    }
  }
}
