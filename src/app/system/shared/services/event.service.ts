import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BaseApi} from '../../../shared/core/base-api';
import {BKEvent} from '../models/event.model';

@Injectable()
export class EventService extends BaseApi {
  constructor(public http: HttpClient) {
  super(http);
  }

  addEvent(event: BKEvent): Observable<BKEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<BKEvent[]> {
    return this.get('events');
  }

}
