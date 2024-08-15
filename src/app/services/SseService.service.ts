import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SseService {

  constructor() { }

  getServerSentEvent(url: string): Observable<MessageEvent> {
    return new Observable(observer => {
      const eventSource = new EventSource(url);

      eventSource.onmessage = event => {
        observer.next(event);
      };

      eventSource.onerror = error => {
        observer.error(error);
        eventSource.close();
      };

      return () => eventSource.close();
    });
  }
}
