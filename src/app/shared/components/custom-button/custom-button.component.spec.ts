import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomButtonComponent } from './custom-button.component';
import { HttpClientModule } from '@angular/common/http';

describe('CustomButtonComponent', () => {
  let component: CustomButtonComponent;
  let fixture: ComponentFixture<CustomButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
