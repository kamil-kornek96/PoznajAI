import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription,finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { faPaperclip,faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"]
})
export class FileUploadComponent {
    @Output() fileUploaded: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    faPaperclip = faPaperclip;
    faXmark = faXmark;
    requiredFileType:string = "";
    private apiUrl: string = environment.apiUrl;
    fileName = '';
    uploadProgress:number | null = null;
    uploadSub: Subscription | null = null;

    constructor(private http: HttpClient) {}

    onFileSelected(event: any) {
        const file:File = event.target.files[0];
      
        if (file) {
            this.uploadProgress = 1;
            this.fileName = file.name;
            const formData = new FormData();
            formData.append("video", file);

            const upload$ = this.http.post(this.apiUrl+"/uploads/video", formData, {
                reportProgress: true,
                observe: 'events'
            })
            .pipe(
                finalize(() => this.reset())
            );
            this.uploadSub = upload$.subscribe(event => {
              if (event.type == HttpEventType.UploadProgress && event.total != undefined) {
                this.uploadProgress = Math.round(100 * (event.loaded / event.total));
              } else if (event.type == HttpEventType.Response && event.body) {
                const uploadedFileName = (event.body as any).fileName;
                this.fileUploaded.emit(uploadedFileName);
              }
            });
        }
    }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
