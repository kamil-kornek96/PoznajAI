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
    // Pobierz HTML z serwisu i przypisz do zmiennej
    settingsService.getSettingsHtml().subscribe((res) => {
      console.log(res)
      this.settingsHtml = res;
    });
  }
}
