import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LessonService } from '../services/lesson.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LessonCreateModel } from './models/lesson-create.model';
import { environment } from 'src/environments/environment';
import { QuillModules } from 'ngx-quill';

@Component({
  selector: 'app-lesson-edit-page',
  templateUrl: './lesson-edit-page.component.html',
  styleUrls: ['./lesson-edit-page.component.scss']
})
export class LessonEditPageComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  lessonForm: FormGroup;
  isCreatingLesson: boolean = true; // Dodaj zmienną, która będzie określać, czy tworzysz lekcję czy edytujesz
  lessonId: string | undefined;
  courseId: string | undefined;
  videoUrl: string | undefined;
  apiUrl: string = environment.apiUrl;
  editorConfig: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean'],                                         // remove formatting button
  
      ['link', 'image', 'video']  
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
    this.quillForm = new FormControl()
    this.lessonForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      duration: [''],
      video: [''],
      isGptActive: [false],
      id: [''],
      courseId: ['']
    });
  }

  

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const lessonId = params.get('lessonId');
      const courseId = params.get('courseId');

      if (lessonId) {
        this.isCreatingLesson = false; 
        this.lessonId = lessonId;

        this.lessonService.getLessonById(lessonId).subscribe((data) => {
            console.log(data)
           this.lessonForm.patchValue(data);
           this.videoUrl = this.apiUrl + '/' +data.video;
           this.quillForm.setValue(data.content);
         });
      }

      if (courseId) {
        this.courseId = courseId; // Przypisz courseId do zmiennej
        this.lessonForm.patchValue({ courseId: courseId }); // Wypełnij pole courseId w formularzu
      }
    });

    this.quillForm.valueChanges.subscribe((newQuillValue) => {
      console.log(newQuillValue)
      this.lessonForm.patchValue({ content: newQuillValue });
    });
  
  }

  handleFileUploaded(fileName: string) {
    // Tutaj możesz wykonać dowolną logikę po otrzymaniu nazwy przesłanego pliku
    console.log(`Przesłano plik: ${fileName}`);
    this.lessonForm.patchValue({ video: fileName });
    this.videoUrl = this.apiUrl + '/' + fileName;
  }


  onSubmit(): void {
    console.log('t')
    if (this.lessonForm.valid) {
      const lessonData = this.lessonForm.value;
      if (this.isCreatingLesson) {
        this.lessonService.createLesson(lessonData).subscribe(
          (response) => {
            console.log('Lesson created successfully', response);
            this.router.navigate(['/main-page/course-page']);
          },
          (error) => {
            console.error('Error creating lesson', error);
            this.toastr.error(
              'An error occurred while creating the lesson',
              'Error'
            );
          }
        );
      } else {
        this.lessonService.updateLesson(lessonData).subscribe(
          (response) => {
            console.log('Lesson updated successfully', response);
            this.router.navigate(['/main-page/course-page']);
          },
          (error) => {
            console.error('Error updating lesson', error);
            this.toastr.error(
              'An error occurred while updating the lesson',
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
