import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubConnection } from '@microsoft/signalr';
import { QuillModules } from 'ngx-quill';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { LessonDetailsModel } from 'src/app/models/lesson-details.model';

import { LessonService } from 'src/app/services/lesson.service';
import { AuthService } from 'src/app/services/auth.service';
import { VideoConversionService } from 'src/app/services/video-conversion.service';
import { HubConnectionService } from 'src/app/services/hub-connection.service';

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss']
})
export class LessonPageComponent {
  public lesson: LessonDetailsModel | undefined;
  public lessonId: string | null;
  public apiUrl: string = environment.apiUrl+"/";
  public quillForm: FormControl;
  safeContent: SafeHtml | undefined;
  public progress: string | undefined;
  private hubConnection: HubConnection | null = null;
  public isVideoAvailable : boolean = false;

  isAdmin = true;

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
              private sanitizer: DomSanitizer,
              private videoConversionService: VideoConversionService,
              private hubConnectionService: HubConnectionService
              ) {
    
    this.lessonId = this.route.snapshot.paramMap.get('id');
    this.quillForm = new FormControl()            
  }

  ngOnInit() {
    this.lessonId && this.lessonPageService.getLessonById(this.lessonId).subscribe(response => {
      this.lesson = response.data;
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(response.data.content.replace('<img','<img style=\'max-width:100%;border-radius:5px;\''));
      this.hubConnection = this.hubConnectionService.getHubConnection();
      this.hubConnection.on(response.data.video, (data: any) => {
        if(data.progress != -1){
          console.log(data.progress)
          this.progress = data.progress
        }
        else{
          this.progress = undefined;
        }
      });
    });

  
    this.hubConnectionService.startConnection()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  
  }

  ngOnDestroy(){
    this.hubConnectionService.stopConnection()
      .then(() => console.log('Connection stopped'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }
  

  onContentChanged(event: any) {
    console.log(event)
    
  }


  goBack(): void {
    this.location.back();
  }
  
}
