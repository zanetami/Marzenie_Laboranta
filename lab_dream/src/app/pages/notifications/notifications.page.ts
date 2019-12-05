import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  columnMode = ColumnMode;
  columns = [];
  rows = [
    {id_i: '1', notif_d: '2019-11-12', lab: '410', priority: 'normal', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'done'},
    {id_i: '2', notif_d: '2019-11-12', lab: '410', priority: 'normal', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'done'},
    {id_i: '3', notif_d: '2019-11-12', lab: '410', priority: 'normal', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'done'},
    {id_i: '4', notif_d: '2019-11-12', lab: '410', priority: 'normal', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'done'},
    {id_i: '5', notif_d: '2019-11-12', lab: '410', priority: 'normal', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'done'},
    {id_i: '6', notif_d: '2019-11-12', lab: '410', priority: 'normal', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'done'},
    {id_i: '7', notif_d: '2019-11-12', lab: '410', priority: 'normal', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'done'},
    {id_i: '8', notif_d: '2019-11-12', lab: '410', priority: 'normal', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'done'},
    {id_i: '9', notif_d: '2019-11-12', lab: '410', priority: 'normal', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'done'},
    {id_i: '10', notif_d: '2019-11-12', lab: '410', priority: 'normal', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'done'},
    {id_i: '11', notif_d: '2019-11-12', lab: '410', priority: 'normal', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'done'},
    {id_i: '12', notif_d: '2019-11-12', lab: '410', priority: 'normal', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'done'},
  ];
  userRole = 'user';

  canDeleteIssue = false;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  @ViewChild(AlertComponent, {static: true}) alertComponent: AlertComponent;

  ngOnInit() {
    this.userRole = 'admin';
    this.specifyColumns();
  }

  logOut() {
    this.router.navigate(['']);
  }

  specifyColumns() {
    if (this.userRole === 'user') {
      this.columns = [
        {
          name: 'Dodano',
          prop: 'notif_d'
        },
        {
          name: 'Sala',
          prop: 'lab'
        },
        {
          name: 'Opis',
          prop: 'descr'
        },
        {
          name: 'Status',
          prop: 'state'
        }
      ];
    } else if (this.userRole === 'service') {
      this.columns = [
        {
          name: 'Przyjęto',
          prop: 'accept_d'
        },
        {
          name: 'Zamknięto',
          prop: 'solve_d'
        },
        {
          name: 'Sala',
          prop: 'lab'
        },
        {
          name: 'Priorytet',
          prop: 'priority'
        },
        {
          name: 'Status',
          prop: 'state'
        }
      ];
    } else if (this.userRole === 'admin') {
      this.columns = [
        {
          name: 'Dodano',
          prop: 'notif_d'
        },
        {
          name: 'Sala',
          prop: 'lab'
        },
        {
          name: 'Wykonawca',
          prop: 'solver_id'
        },
        {
          name: 'Status',
          prop: 'state'
        }
      ];
    }
  }

  deleteIssueActivated() {
    this.canDeleteIssue = !this.canDeleteIssue;
  }

  onActivate(event) {
    if (event.type === 'click') {
      if ( this.canDeleteIssue ) {
        this.deleteIssue(event.row);
      } else {
        this.detailIssue(event.row);
      }
    }
  }

  deleteIssue(object) {
    const index = this.rows.indexOf(object);
    return this.rows.splice(index, 1);
  }

  detailIssue(object) {}

}
