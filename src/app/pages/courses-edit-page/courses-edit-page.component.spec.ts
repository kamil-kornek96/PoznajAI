import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesEditPageComponent } from './courses-edit-page.component';

describe('CoursesEditPageComponent', () => {
  let component: CoursesEditPageComponent;
  let fixture: ComponentFixture<CoursesEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesEditPageComponent],
    });
    fixture = TestBed.createComponent(CoursesEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
