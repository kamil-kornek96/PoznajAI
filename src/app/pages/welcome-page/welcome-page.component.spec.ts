import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomePageComponent } from './welcome-page.component';

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomePageComponent],
    });

    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.rightClasses).toEqual('right');
    expect(component.loaderClasses).toEqual('loader-container');
    expect(component.isLogin).toBeFalsy();
  });

  it('should update classes on loaderOn()', () => {
    component.loaderOn();
    expect(component.rightClasses).toEqual('right right-full');
    expect(component.loaderClasses).toEqual('loader-container loader-center');
  });

  it('should update classes on loaderOff()', () => {
    component.loaderOff();
    expect(component.rightClasses).toEqual('right');
    expect(component.loaderClasses).toEqual('loader-container');
  });

});
