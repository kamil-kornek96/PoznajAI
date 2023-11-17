import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsPageComponent {
  settingsHtml: string = "";

  constructor(private settingsService: SettingsService) {
    settingsService.getSettingsHtml().subscribe((res) => {
      this.settingsHtml = res;
    });
  }
}
