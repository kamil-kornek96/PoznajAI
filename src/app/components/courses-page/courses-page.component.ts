import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CoursePageService } from '../services/course-page.service';
import { CourseResponseModel } from './models/course-response.model';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent {
    public authservice: AuthService;
    public userCourses: CourseResponseModel | undefined;
    constructor (private auth: AuthService,private coursePageService: CoursePageService){
      this.authservice=auth;
    }

    ngOnInit(){
      this.coursePageService.getUserCourses().subscribe(response => {
        this.userCourses = response;
      })
    }
}
