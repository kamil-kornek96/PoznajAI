import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { CourseResponseModel } from 'src/app/models/course-response.model';

import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';

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
