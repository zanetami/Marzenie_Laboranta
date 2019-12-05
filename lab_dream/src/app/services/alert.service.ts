import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationsPage } from '../pages/notifications/notifications.page';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // private alertResponseSource = new BehaviorSubject<boolean>(null);
  // alertResponse = this.alertResponseSource.asObservable();

  // notificationsPage: NotificationsPage;

  // constructor() { }

  // setAlertResponse(bool) {
  //   this.alertResponseSource.next(bool);
  // }

  // getAlertResponse(): Observable<boolean> {
  //   return this.alertResponse;
  // }
}
