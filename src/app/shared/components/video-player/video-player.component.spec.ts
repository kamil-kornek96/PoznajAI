import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoPlayerComponent } from './video-player.component';
import { environment } from 'src/environments/environment';

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoPlayerComponent],
    });

    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set apiUrl correctly', () => {
    expect(component.apiUrl).toBe(environment.apiUrl + '/uploads/video/');
  });

  // Add more tests as needed for other functionalities in your component

  // Example: test for Input property videoUrl
  it('should display video when videoUrl is provided', () => {
    component.videoUrl = 'some-video-url.mp4';
    fixture.detectChanges();
    const videoElement: HTMLVideoElement | null = fixture.nativeElement.querySelector('video');
    expect(videoElement).toBeTruthy();
    // You can add more expectations for the video element
  });

  // Example: test for handling undefined videoUrl
  it('should not display video when videoUrl is undefined', () => {
    fixture.detectChanges();
    const videoElement: HTMLVideoElement | null = fixture.nativeElement.querySelector('video');
    expect(videoElement).toBeFalsy();
  });
});
