import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonCreatePageComponent } from './lesson-create-page.component';

describe('LessonCreatePageComponent', () => {
  let component: LessonCreatePageComponent;
  let fixture: ComponentFixture<LessonCreatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonCreatePageComponent]
    });
    fixture = TestBed.createComponent(LessonCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
