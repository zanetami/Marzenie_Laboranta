import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {

  columnMode = ColumnMode;
  columns = [];
  rows = [
    {id_i: '1', notif_d: '2019-11-12', priority: 'Wysoki', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'W naprawie'},
    {id_i: '2', notif_d: '2019-11-12', priority: 'Normalny', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'Oczekuje'},
    {id_i: '3', notif_d: '2019-11-12', priority: 'Niski', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'Rozwiązane'},
    {id_i: '4', notif_d: '2019-11-12', priority: 'Normalny', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'Rozwiązane'},
    {id_i: '5', notif_d: '2019-11-12', priority: 'Normalny', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'Rozwiązane'},
    {id_i: '6', notif_d: '2019-11-12', priority: 'Niski', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'W naprawie'},
    {id_i: '7', notif_d: '2019-11-12', priority: 'Normalny', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'Rozwiązane'},
    {id_i: '8', notif_d: '2019-11-12', priority: 'Wysoki', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'Rozwiązane'},
    {id_i: '9', notif_d: '2019-11-12', priority: 'Wysoki', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'Rozwiązane'},
    {id_i: '10', notif_d: '2019-11-12', priority: 'Normalny', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'W naprawie'},
    {id_i: '11', notif_d: '2019-11-12', priority: 'Niski', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'Oczekuje'},
    {id_i: '12', notif_d: '2019-11-12', priority: 'Niski', descr: 'adasdsadsadas as dsad as asd as', accept_d: '2019-11-12', solve_d: '2019-11-12', solver_id: '3', state: 'Oczekuje'},
  ];
  userRole = 'user';

  canDeleteIssue = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    this.userRole = 'admin';
    this.specifyColumns();
  }

  specifyColumns() {
    if (this.userRole === 'user') {
      this.columns = [
        {
          name: 'Dodano',
          prop: 'notif_d'
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
          name: 'Wykonawca',
          prop: 'solver_id'
        },
        {
          name: 'Status',
          prop: 'state'
        },
        {
          name: 'Priorytet',
          prop: 'priority'
        }
      ];
    }
  }

  // #region popupy
  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  async deleteAlert(issueObject) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: 'Czy napewno usunąć zgłoszenie?',
      buttons: [
        {
          text: 'Usuń',
          role: 'delete',
          handler: () => {
            this.deleteIssue(issueObject);
            this.presentToast('Zgłoszenie usunięte.', 1000);
          }
        },
        {
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {
            this.presentToast('Anulowano zdarzenie.', 1000);
          }
        }
      ]
    });

    await alert.present();
  }
//#endregion

  logOut() {
    this.router.navigate(['']);
  }

  onActivate(event) {
    if (event.type === 'click') {
      if ( this.canDeleteIssue ) {
        this.deleteAlert(event.row);
        
      } else {
        this.detailIssue(event.row);
      }
    }
  }

  //#region usuwanie zgłoszenia
  deleteIssue(object) {
    const index = this.rows.indexOf(object);
    return this.rows.splice(index, 1);
  }

  deleteIssueActivated() {
    this.canDeleteIssue = !this.canDeleteIssue;
  }
  //#endregion

  //#region szczegóły zgłoszenia
  detailIssue(object) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        issue: JSON.stringify(object)
      }
    };
    this.router.navigate(['logged/notification-details'], navigationExtras);
  }
  //#endregion

  //#region dodawanie zgłoszenia
  addIssue() {
    // let issue = [

    // ]
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     issue: JSON.stringify(object)
    //   }
    // };
    this.router.navigate(['logged/notification-add']);
  }

  //#endregion

}
