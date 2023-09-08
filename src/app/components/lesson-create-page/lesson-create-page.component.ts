import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonService } from '../services/lesson.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson-create-page',
  templateUrl: './lesson-create-page.component.html',
  styleUrls: ['./lesson-create-page.component.scss']
})
export class LessonCreatePageComponent {
  faXmark = faXmark;
  @Input() courseId: any;
  lessonForm: FormGroup;
  public clicked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private lessonService: LessonService
    ) {
    this.lessonForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      duration: [''],
      video: [''],
      isGptActive: [false],
      courseId: [this.courseId]
    });
  }

  ngOnInit(): void {

  }

  toggleClicked(){
    this.clicked = !this.clicked;
  }

    onSubmit(): void {
      if (this.lessonForm.valid) {
        const lessonData = this.lessonForm.value;
  
        // Send the lessonData to your service to create the lesson
        this.lessonService.createLesson(lessonData).subscribe(
           (response) => {
             console.log('Lesson created successfully', response);
           },
           (error) => {
             console.error('Error creating lesson', error);
           }
         );
      }
    }
}
