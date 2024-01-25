import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from 'src/app/services/toast.service';
import { ToastModel, toastTypes } from 'src/app/models/toast.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      imports: [BrowserAnimationsModule],
      providers: [ToastService],
    });

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update properties based on toast data', () => {
    const toastData: ToastModel = { show: true, type: toastTypes.success, content: '' };

    toastService.open.next(toastData);

    expect(component.textClass).toBe('success-text');
    expect(component.text).toBe('Sukces!');
    expect(component.iconPath).toBe('assets/icons/toast-success.svg');
  });

  it('should start countdown on toast show', fakeAsync(() => {
    const toastData: ToastModel = { show: true, type: toastTypes.success, content: '' };
    spyOn(component, 'countDown');

    toastService.open.next(toastData);
    tick(0);

    expect(component.countDown).toHaveBeenCalled();
  }));

  it('should hide toast and reset properties after countdown', fakeAsync(() => {
    spyOn(component.toastService, 'hide');
  
    const toastData: ToastModel = { show: true, type: toastTypes.success, content: '' };
    toastService.open.next(toastData);
    tick(30000); // Adjust the time based on your countdown logic
  
    expect(component.toastService.hide).toHaveBeenCalled();
    expect(component.textClass).toBe('');
    expect(component.text).toBe('');
    expect(component.iconPath).toBe('');
  }));
  

  it('should stop countdown on stopCountDown', fakeAsync(() => {
    spyOn(window, 'clearInterval');

    component.progressInterval = 1; // Mock an interval

    component.stopCountDown();
    tick();

    expect(window.clearInterval).toHaveBeenCalledWith(1);
    expect(component.progressInterval).toBeUndefined();
  }));
});
