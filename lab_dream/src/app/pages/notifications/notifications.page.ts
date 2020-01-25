import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AlertController, ToastController } from '@ionic/angular';
import { IssueService } from 'src/app/services/issue.service';
import { User } from 'src/app/models/user';
import { LoggedUserService } from 'src/app/services/logged-user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {

  loggedUser: User = null;

  columnMode = ColumnMode;
  columns = [];
  rows = [];
  solvers: User[] = [];

  canDeleteIssue = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private issueService: IssueService,
    private loggedUserService: LoggedUserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getAllNotifications();
    });
    this.loggedUser = this.loggedUserService.loggedUser;
  }

  ionViewWillEnter() {
    this.getAllNotifications();
    this.specifyColumns();
  }

  getAllNotifications() {
    this.issueService.getAllIssuesByUser(this.loggedUser).subscribe( response => {
      this.rows = response;
    });
  }

  datePipe(date) {
    return date.toString().substring(0, 10);
  }

  specifyColumns() {
    if (this.loggedUser.role === 'Użytkownik') {
      this.columns = [
        {
          name: 'Dodano',
          prop: 'notif_d',
          pipe: { transform: this.datePipe}

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
    } else if (this.loggedUser.role === 'Serwisant') {
      this.columns = [
        {
          name: 'Przyjęto',
          prop: 'accept_d',
          pipe: { transform: this.datePipe}
        },
        {
          name: 'Zamknięto',
          prop: 'solve_d',
          pipe: { transform: this.datePipe}
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
    } else if (this.loggedUser.role === 'Administrator') {
      this.columns = [
        {
          name: 'Dodano',
          prop: 'notif_d',
          pipe: { transform: this.datePipe}
        },
        {
          name: 'Wykonawca',
          prop: 'solver_id',

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
    this.issueService.deleteIssue(object.id_i).subscribe( response => {
      if (response === true) {
        this.presentToast('Zgłoszenie usunięte.', 1000);
        this.getAllNotifications();

      } else {
        this.presentToast('Wystąpił błąd podczas usuwania zgłoszenia', 1000);
      }
    });
    
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
    let navigationExtras: NavigationExtras = {
      queryParams: {
        initiator_id: JSON.stringify(this.loggedUser.id_u)
      }
    };
    this.router.navigate(['logged/notification-add'], navigationExtras);
  }

  //#endregion

}
