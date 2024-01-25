import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomInputComponent } from './custom-input.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

describe('CustomInputComponent', () => {
  let component: CustomInputComponent;
  let fixture: ComponentFixture<CustomInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomInputComponent],
      providers: [],
      imports: [HttpClientModule, CommonModule, FormsModule], // Add FormsModule here
    });
    fixture = TestBed.createComponent(CustomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
