import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCheckboxComponent } from './custom-checkbox.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


describe('CustomCheckboxComponent', () => {
  let component: CustomCheckboxComponent;
  let fixture: ComponentFixture<CustomCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCheckboxComponent],
      providers: [],
      imports: [HttpClientModule,CommonModule,FormsModule],  // Add RouterModule here
    });
    fixture = TestBed.createComponent(CustomCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
