import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AlertController, ToastController } from '@ionic/angular';
import { DeviceService } from 'src/app/services/device.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { IssueService } from 'src/app/services/issue.service';
import { LoggedUserService } from 'src/app/services/logged-user.service';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.page.html',
  styleUrls: ['./notification-details.page.scss'],
})
export class NotificationDetailsPage {

  columnMode = ColumnMode;
  issue;
  userSolver;
  loggedUser;
  servicemans: User[] = [];
  connectedDevices: Device[] = [];
  columns = [
    {
      name: 'Typ',
      prop: 'type'
    },
    {
      name: 'Sala',
      prop: 'lab'
    },
    {
      name: 'Identyfikator',
      prop: 'id_d'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private deviceService: DeviceService,
    private userService: UserService,
    private issueService: IssueService,
    private router: Router,
    private loggedUserService: LoggedUserService
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.issue) {
        this.issue = JSON.parse(params.issue);
      }
    });
    this.loggedUser = this.loggedUserService.loggedUser
  }

  ionViewWillEnter() {
    this.getConnectedDevices();
    this.getSolver();
    this.getServicemans();
  }

  backToNotifications() {
    this.router.navigate(['logged/notifications']);
  }

  //#region popupy
  async solveAlert() {
    const alert = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: 'Czy na pewno rozwiązać zgłoszenie?',
      buttons: [
        {
          text: 'Rozwiązane',
          role: 'solve',
          handler: () => {
            this.issue.state = 'Rozwiązane';
            this.issueService.updateIssue(this.issue).subscribe( response => {
              if (response === true) {
                this.presentToast('Rozwiązano zgłoszenie', 1000);
              }
            });
          }
        },
        {
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
  //#endregion

  getConnectedDevices() {
    this.deviceService.getAllConnectedDevices(this.issue.id_i).subscribe( response => {
      this.connectedDevices = response;
    });
  }

  getServicemans() {
    this.userService.getAllUsers().subscribe( response => {
      response.forEach(user => {
        if (user.role === 'Serwisant') {
          this.servicemans.push(user);
        }
      });
    });
  }

  getSolver() {
    if (this.issue.solver_id != null) {
      this.userService.getUserById(this.issue.solver_id).subscribe( response => {
        this.userSolver = response[0].id_u + ' ' + response[0].name + ' '  + response[0].lastname;
      });
    }
  }

  userSelected(event) {
    const solver_id = event.detail.value.split(' ')[0];
    this.issueService.setIssueSolver(this.issue.id_i, solver_id).subscribe( response => {});
    this.userSolver = event.detail.value;
  }

  changePriority(direction) {
    if ( this.issue.state !== 'Rozwiązane' ) {
      if ( direction === 'up' ) {
        switch (this.issue.priority) {
          case 'Niski': {
            this.issue.priority = 'Normalny';
            break;
          }
          case 'Normalny': {
            this.issue.priority = 'Wysoki';
            break;
          }
          default: {
            break;
          }
        }
      } else {
        switch (this.issue.priority) {
          case 'Normalny': {
            this.issue.priority = 'Niski';
            break;
          }
          case 'Wysoki': {
            this.issue.priority = 'Normalny';
            break;
          }
          default: {
            break;
          }
        }
      }
    }
    this.issueService.updateIssue(this.issue).subscribe( response => {
      if (response === true) {
        this.presentToast('Zmieniono priorytet.', 1000);
      }
    });
  }

  changeState() {
    if (this.issue.state === 'Oczekuje') {
      this.issue.state = 'W naprawie';
      this.issueService.updateIssue(this.issue).subscribe( response => {
        if (response === true) {
          this.presentToast('Zmieniono status.', 1000);
        }
      });
    } else if ( this.issue.state === 'W naprawie' ) {
      this.solveAlert();
    }
    // przeslij do bazy zmiane
  }

}
