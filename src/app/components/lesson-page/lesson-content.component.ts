import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuillModules } from 'ngx-quill';
import * as hljs from 'highlight.js';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LessonDetailsModel } from './models/lesson-details.model';
import { LessonPageService } from '../services/lesson-page.service';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-content.component.scss']
})
export class LessonContentComponent {
  public lesson: LessonDetailsModel | undefined;
  public lessonId: string | null;
  public quillForm: FormControl;

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
              private lessonPageService: LessonPageService,
              private location: Location) {
    
    this.lessonId = this.route.snapshot.paramMap.get('id');
    this.quillForm = new FormControl()            
  }

  ngOnInit() {
    this.lessonId && this.lessonPageService.getLessonById(this.lessonId).subscribe(response => {
      this.lesson = response;
    })
  }

  onContentChanged(event: any) {
    console.log(event)
    
  }

  test(){
    console.log(this.quillForm)
    
  }

  goBack(): void {
    this.location.back();
  }
  
}
