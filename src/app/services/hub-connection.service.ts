import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HubConnectionService {
  private hubConnection: HubConnection;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.url+'video-conversion-hub')
      .build();
  }

  startConnection() {
    return this.hubConnection.start();
  }

  getHubConnection() {
    return this.hubConnection;
  }
}
