import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder and FormGroup
import { CourseService } from '../services/course.service';
import { CourseUpdateModel } from './models/course-update.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-courses-edit-page',
  templateUrl: './courses-edit-page.component.html',
  styleUrls: ['./courses-edit-page.component.scss'],
})
export class CoursesEditPageComponent implements OnInit {
  course: CourseUpdateModel | undefined;
  courseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    if(!this.authService.loggedUser?.isAdmin){
      this.router.navigate(['/main-page/course-page']);//Tylko Admin
    }
    this.courseForm = this.formBuilder.group({
      id: [''],
      title: [''],
      description: ['']

    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const courseId = params.get('id');

      if (courseId) {
        this.courseService.getCourseToUpdate(courseId).subscribe((data) => {
          this.course = data;

          this.courseForm.patchValue(data);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const updatedCourseData = this.courseForm.value as CourseUpdateModel;
  
      this.courseService.updateCourse(updatedCourseData).subscribe(
        (response) => {
          console.log('Course updated successfully1', response);
          this.router.navigate(['/main-page/course-page']);
        },
        (error) => {
          console.error('Error updating course', error);
          this.toastr.error('An error occurred while updating the course', 'Error');
        }
      );
    }
  }
  
}
