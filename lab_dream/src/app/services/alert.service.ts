import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationsPage } from '../pages/notifications/notifications.page';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertResponse = new BehaviorSubject<boolean>(null);
  currentAlertResponse = this.alertResponse.asObservable();

  notificationsPage: NotificationsPage;

  constructor() { }

  setResponse(bool) {
    this.notificationsPage.setActionPermission(bool);
    console.log('here: ', bool);
  }
}
