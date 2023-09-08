import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CourseModel } from '../models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-not-owned',
  templateUrl: './course-not-owned.component.html',
  styleUrls: ['./course-not-owned.component.scss']
})

export class CourseNotOwnedComponent {
  @Input() authService: any;
  @Input() course: CourseModel | undefined;
  @Input() owned: boolean | undefined;
  


  constructor(private router: Router) {
  }

  buyCourse() {
    // Logika zakupu kursu
  }

  editCourse(){
    if (this.course && this.course.id) {
      this.router.navigate(['main-page/edit-course', this.course.id]);
    }
  }
}