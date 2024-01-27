import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { QuillModules } from 'ngx-quill';

import { ToastrService } from 'ngx-toastr';
import { LessonService } from 'src/app/services/lesson.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lesson-edit-page',
  templateUrl: './lesson-edit-page.component.html',
  styleUrls: ['./lesson-edit-page.component.scss'],
})
export class LessonEditPageComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  lessonForm: FormGroup;
  isCreatingLesson: boolean = true;
  lessonId: string | undefined;
  courseId: string | undefined;
  videoUrl: string | undefined;
  apiUrl: string = environment.apiUrl;
  editorConfig: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],

      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],

      ['clean'],

      ['link', 'image', 'video'],
    ],
  };
  public quillForm: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private lessonService: LessonService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
  ) {
    if (!this.authService.loggedUser?.isAdmin) {
      this.router.navigate(['/main-page/course-page']); // Tylko Admin
    }
    this.quillForm = new FormControl();
    this.lessonForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      duration: [''],
      video: [''],
      isGptActive: [false],
      id: [''],
      courseId: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const lessonId = params.get('lessonId');
      const courseId = params.get('courseId');

      if (lessonId) {
        this.isCreatingLesson = false;
        this.lessonId = lessonId;

        this.lessonService.getLessonById(lessonId).subscribe((res) => {
          this.lessonForm.patchValue(res.data);
          this.videoUrl = res.data.video;
          this.quillForm.setValue(res.data.content);
        });
      }

      if (courseId) {
        this.courseId = courseId;
        this.lessonForm.patchValue({ courseId: courseId });
      }
    });

    this.quillForm.valueChanges.subscribe((newQuillValue) => {
      this.lessonForm.patchValue({ content: newQuillValue });
    });
  }

  handleFileUploaded(fileName: string) {
    this.toastr.success(`Przesłano plik: ${fileName}`);
    this.lessonForm.patchValue({ video: fileName });
    this.videoUrl = fileName;
  }

  onSubmit(): void {
    if (this.lessonForm.valid) {
      const lessonData = this.lessonForm.value;
      if (this.isCreatingLesson) {
        this.lessonService.createLesson(lessonData).subscribe((response) => {
          this.router.navigate(['/main-page/course-page']);
        });
      } else {
        this.lessonService.updateLesson(lessonData).subscribe((response) => {
          this.router.navigate(['/main-page/course-page']);
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
