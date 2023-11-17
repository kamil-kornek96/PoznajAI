import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CourseService } from '../services/course.service';
import { CourseResponseModel } from './models/course-response.model';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent {
    faPlus = faPlus;
    public userCourses: CourseResponseModel | undefined;
    constructor (
      public authService: AuthService,
      private CourseService: CourseService,
      private router: Router
      )
    {}

    ngOnInit(){
      this.CourseService.getUserCourses().subscribe(response => {
        this.userCourses = response;
      })
    }

    createCourse(){
      this.router.navigate(['main-page/create-course']);
    }
}
