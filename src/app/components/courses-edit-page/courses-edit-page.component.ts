import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { CourseUpdateModel } from './models/course-update.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Location } from '@angular/common';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-courses-edit-page',
  templateUrl: './courses-edit-page.component.html',
  styleUrls: ['./courses-edit-page.component.scss'],
})
export class CoursesEditPageComponent implements OnInit {
  course: CourseUpdateModel | undefined;
  isCreatingCourse: boolean = true; // Dodaj zmienną, która będzie określać, czy tworzysz kurs czy edytujesz
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
        this.isCreatingCourse = false; // Jeśli istnieje courseId, to nie tworzymy kursu, tylko go edytujemy

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
        // Tworzenie nowego kursu
        this.courseService.createCourse(formData).subscribe(
          (response) => {
            console.log('Course created successfully', response);
            this.router.navigate(['/main-page/course-page']);
          },
          (error) => {
            console.error('Error creating course', error);
            this.toastr.error(
              'An error occurred while creating the course',
              'Error'
            );
          }
        );
      } else {
        // Edycja istniejącego kursu
        const updatedCourseData = formData as CourseUpdateModel;

        this.courseService.updateCourse(updatedCourseData).subscribe(
          (response) => {
            console.log('Course updated successfully', response);
            this.router.navigate(['/main-page/course-page']);
          },
          (error) => {
            console.error('Error updating course', error);
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
