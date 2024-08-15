import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private socket: Socket) {}

  getUpdates() {
    return this.socket.fromEvent('dataUpdated');
  }
}
