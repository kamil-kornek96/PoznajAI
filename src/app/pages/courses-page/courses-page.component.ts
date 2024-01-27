import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { UserCoursesModel } from 'src/app/models/user-courses.model';

import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent {
  faPlus = faPlus;
  public userCourses: UserCoursesModel | undefined;
  constructor(
    public authService: AuthService,
    private courseService: CourseService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.courseService.getUserCourses().subscribe((response) => {
      this.userCourses = response.data;
    });
  }

  createCourse() {
    this.router.navigate(['main-page/create-course']);
  }
}
