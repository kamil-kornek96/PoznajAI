import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { CourseUpdateModel } from 'src/app/models/course-update.model';

import { CourseService } from 'src/app/services/course.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-courses-edit-page',
  templateUrl: './courses-edit-page.component.html',
  styleUrls: ['./courses-edit-page.component.scss'],
})
export class CoursesEditPageComponent implements OnInit {
  course: CourseUpdateModel | undefined;
  isCreatingCourse: boolean = true;
  courseForm: FormGroup;
  faArrowLeft = faArrowLeft;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) {
    if (!this.authService.loggedUser?.isAdmin) {
      this.router.navigate(['/main-page/course-page']);
    }

    this.courseForm = this.formBuilder.group({
      id: [''],
      title: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const courseId = params.get('id');

      if (courseId) {
        this.isCreatingCourse = false;

        this.courseService.getCourseToUpdate(courseId).subscribe((data) => {
          this.course = data;
          this.courseForm.patchValue(data);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;

      if (this.isCreatingCourse) {
        this.courseService.createCourse(formData).subscribe(
          (response) => {
            this.router.navigate(['/main-page/course-page']);
          },
          (error) => {
            this.toastr.error(
              'An error occurred while creating the course',
              'Error'
            );
          }
        );
      } else {
        const updatedCourseData = formData as CourseUpdateModel;

        this.courseService.updateCourse(updatedCourseData).subscribe(
          (response) => {
            this.router.navigate(['/main-page/course-page']);
          },
          (error) => {
            this.toastr.error(
              'An error occurred while updating the course',
              'Error'
            );
          }
        );
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
