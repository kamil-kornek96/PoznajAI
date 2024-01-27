import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNotOwnedComponent } from './course-not-owned.component';

describe('CourseNotOwnedComponent', () => {
  let component: CourseNotOwnedComponent;
  let fixture: ComponentFixture<CourseNotOwnedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseNotOwnedComponent],
    });
    fixture = TestBed.createComponent(CourseNotOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
