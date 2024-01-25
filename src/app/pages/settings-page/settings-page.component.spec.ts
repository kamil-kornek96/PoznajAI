import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SettingsPageComponent } from './settings-page.component';
import { SettingsService } from 'src/app/services/settings.service';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;
  let settingsService: jasmine.SpyObj<SettingsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SettingsService', ['getSettingsHtml']);
    TestBed.configureTestingModule({
      declarations: [SettingsPageComponent],
      providers: [{ provide: SettingsService, useValue: spy }],
    });

    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    settingsService = TestBed.inject(SettingsService) as jasmine.SpyObj<SettingsService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty settingsHtml', () => {
    expect(component.settingsHtml).toEqual('');
  });

  it('should call getSettingsHtml and update settingsHtml on initialization', () => {
    const dummyHtml = '<div>Sample HTML</div>';
    settingsService.getSettingsHtml.and.returnValue(of(dummyHtml));

    fixture.detectChanges();

    expect(settingsService.getSettingsHtml).toHaveBeenCalled();
    expect(component.settingsHtml).toEqual(dummyHtml);
  });
});
