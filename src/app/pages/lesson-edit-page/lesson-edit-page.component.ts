import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
import { QuillEditorComponent, QuillModules } from 'ngx-quill';
import { LessonService } from 'src/app/services/lesson.service';
import { AuthService } from 'src/app/services/auth.service';
import { LessonCreateModel } from 'src/app/models/lesson-create.model';
import { LessonModel } from 'src/app/models/lesson.model';
import { LessonDetailsModel } from 'src/app/models/lesson-details.model';
import { ToastService } from 'src/app/services/toast.service';
import { toastTypes } from 'src/app/models/toast.model';

@Component({
  selector: 'app-lesson-edit-page',
  templateUrl: './lesson-edit-page.component.html',
  styleUrls: ['./lesson-edit-page.component.scss'],
})
export class LessonEditPageComponent implements OnInit, AfterViewInit {
  @ViewChild('quillEditor') quillEditor?: QuillEditorComponent;
  faArrowLeft = faArrowLeft;
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
  public form: LessonDetailsModel = {
    title: '',
    content: '',
    duration: '',
    video: '',
    isGptActive: false,
    id: '',
    courseId: '',
  };

  constructor(
    private lessonService: LessonService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private toast: ToastService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    if (!this.authService.loggedUser?.isAdmin) {
      this.router.navigate(['/main-page/course-page']); // Tylko Admin
    }
    this.quillForm = new FormControl();
  }

  ngOnInit(): void {
    this.quillEditor?.quillEditor.focus();
    this.route.paramMap.subscribe((params) => {
      const lessonId = params.get('lessonId');
      const courseId = params.get('courseId');

      if (lessonId) {
        this.isCreatingLesson = false;
        this.lessonId = lessonId;
        this.lessonService.getLessonById(lessonId).subscribe((res) => {
          this.form = res.data;
          this.videoUrl = res.data.video;
          this.quillForm.setValue(res.data.content);
        });
      }

      if (courseId) {
        this.courseId = courseId;
        this.form.courseId = courseId;
      }
    });

    this.quillForm.valueChanges.subscribe((newQuillValue) => {
      this.form.content = newQuillValue;
    });
  }

  ngAfterViewInit() {}

  handleFileUploaded(file: string) {
    console.log(file);
    this.toast.initiate({
      type: toastTypes.success,
      content: `Przesłano plik: ${file}`,
    });
    this.form.video = file;
  }

  onSubmit(): void {
    if (this.form) {
      if (this.isCreatingLesson) {
        this.lessonService.createLesson(this.form).subscribe((response) => {
          this.router.navigate(['/main-page/course-page']);
        });
      } else {
        this.lessonService.updateLesson(this.form).subscribe((response) => {
          this.router.navigate(['/main-page/course-page']);
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  editorFocus() {
    const containers =
      this.elementRef.nativeElement.querySelectorAll('.ql-container');
    containers.forEach((container: HTMLElement) => {
      this.renderer.setStyle(container, 'outline', 'none');
      this.renderer.setStyle(container, 'borderRadius', '8px');
      this.renderer.setStyle(
        container,
        'border',
        '1px solid var(--gradients-blue-green-500, #82dbf7)',
      );
      this.renderer.setStyle(
        container,
        'background',
        'var(--noble-black-600, #1a1d21)',
      );
      this.renderer.setStyle(
        container,
        'boxShadow',
        '0px 0px 0px 4px rgba(132, 220, 245, 0.24)',
      );
    });
  }

  editorBlur() {
    const containers =
      this.elementRef.nativeElement.querySelectorAll('.ql-container');
    containers.forEach((container: HTMLElement) => {
      this.renderer.removeStyle(container, 'outline');
      this.renderer.removeStyle(container, 'borderRadius');
      this.renderer.removeStyle(container, 'border');
      this.renderer.removeStyle(container, 'background');
      this.renderer.removeStyle(container, 'boxShadow');
    });
  }
}
