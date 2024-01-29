import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientCardComponent } from './gradient-card.component';

describe('GradientCardComponent', () => {
  let component: GradientCardComponent;
  let fixture: ComponentFixture<GradientCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradientCardComponent]
    });
    fixture = TestBed.createComponent(GradientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
