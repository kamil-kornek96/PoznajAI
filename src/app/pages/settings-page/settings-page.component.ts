import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  settingsHtml: string = "";

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.getSettingsHtml().subscribe(
      (res) => {
        this.settingsHtml = res;
      },
      (error) => {
        console.error('Error fetching settings HTML:', error);
      }
    );
  }
}
