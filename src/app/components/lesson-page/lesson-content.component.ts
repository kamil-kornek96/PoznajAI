import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuillModules } from 'ngx-quill';
import * as hljs from 'highlight.js';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LessonDetailsModel } from './models/lesson-details.model';
import { LessonService } from '../services/lesson.service';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-content.component.scss']
})
export class LessonContentComponent {
  public lesson: LessonDetailsModel | undefined;
  public lessonId: string | null;
  public apiUrl: string = environment.apiUrl+"/";
  public quillForm: FormControl;
  safeContent: SafeHtml | undefined;

  isAdmin = true; // Przykładowy warunek sprawdzający, czy użytkownik ma uprawnienia administratora

  editorConfig: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ],
  };

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private lessonPageService: LessonService,
              private location: Location,
              private sanitizer: DomSanitizer
              ) {
    
    this.lessonId = this.route.snapshot.paramMap.get('id');
    this.quillForm = new FormControl()            
  }

  ngOnInit() {
    this.lessonId && this.lessonPageService.getLessonById(this.lessonId).subscribe(response => {
      this.lesson = response;
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(response.content.replace('<img','<img style=\'max-width:100%;border-radius:5px;\''));
    });
  }

  onContentChanged(event: any) {
    console.log(event)
    
  }


  goBack(): void {
    this.location.back();
  }
  
}
