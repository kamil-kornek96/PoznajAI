import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class HubConnectionService {
  private hubConnection: HubConnection;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44376/video-conversion-hub')
      .build();
  }

  startConnection() {
    return this.hubConnection.start();
  }

  getHubConnection() {
    return this.hubConnection;
  }
}
