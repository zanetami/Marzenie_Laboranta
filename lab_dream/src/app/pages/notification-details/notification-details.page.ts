import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.page.html',
  styleUrls: ['./notification-details.page.scss'],
})
export class NotificationDetailsPage implements OnInit {

  columnMode = ColumnMode;
  issue;
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
    },
    // {
    //   name: 'Marka',
    //   prop: 'brand'
    // },
    // {
    //   name: 'Model/wersja',
    //   prop: 'model'
    // }
  ];

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.issue) {
        this.issue = JSON.parse(params.issue);
      }
    });
  }

  ngOnInit() {
    this.getConnectedDevices();
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
            this.presentToast('Rozwiązano zgłoszenie', 1000);
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
    //this.connectedDevices = getfromAPI gdzie lab sie zgadza
    // id_d: number;
    // type: string;
    // brand: string;
    // model: string;
    this.connectedDevices = [
      {id_d: 'BHBi67', type: 'Sprzęt', brand: 'Samsung', model: 'Note5', lab: '435'},
      {id_d: 'QHJ78J', type: 'oprogramowanie', brand: 'mathematica', model: '8.1', lab: '675'},
      {id_d: 'MOX5D7', type: 'sieć', brand: 'internet', model: '', lab: '142'},
    ]
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
    // przeslij do bazy zmiane
  }

  changeState() {
    if (this.issue.state === 'Oczekuje') {
      this.issue.state = 'W naprawie';
    } else if ( this.issue.state === 'W naprawie' ) {
      this.solveAlert();
    }
    // przeslij do bazy zmiane
  }

}
