import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CourseService } from '../services/course.service';
import { CourseResponseModel } from './models/course-response.model';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent {
    public authservice: AuthService;
    public userCourses: CourseResponseModel | undefined;
    constructor (private auth: AuthService,private CourseService: CourseService){
      this.authservice=auth;
    }

    ngOnInit(){
      this.CourseService.getUserCourses().subscribe(response => {
        this.userCourses = response;
      })
    }
}
