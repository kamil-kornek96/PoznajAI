import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  settingsHtml: string = '';

  constructor(private settingsService: SettingsService) {
    settingsService.getSettingsHtml().subscribe((res) => {
      this.settingsHtml = res;
    });
  }
}
