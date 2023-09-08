import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CourseModel } from '../models/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent {
  @Input() authService: any;
  @Input() course: CourseModel | undefined;
  @Input() owned: boolean | undefined;
  


  constructor() {
  }

}
