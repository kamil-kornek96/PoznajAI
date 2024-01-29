import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent {
  @Input() videoUrl: string | undefined;
  apiUrl: string = environment.apiUrl + '/uploads/video/';

  ngOnInit(): void {}
}
