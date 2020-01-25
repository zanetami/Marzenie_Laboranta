import { Component } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { NotificationDeviceAddPage } from '../notification-device-add/notification-device-add.page';
import { Device } from 'src/app/models/device';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IssueService } from 'src/app/services/issue.service';
import { DeviceService } from 'src/app/services/device.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification-add',
  templateUrl: './notification-add.page.html',
  styleUrls: ['./notification-add.page.scss'],
})
export class NotificationAddPage {

  // ngx-datatable
  columnMode = ColumnMode;
  columns = [
    {
      name: 'Typ',
      prop: 'type',
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

  allConnections: Device[] = [];

  issueForm: FormGroup;
  errorMessages = {
    description: [
      { type: 'required', message: 'Opis jest wymagany.' },
      { type: 'minLength', message: 'Opis powinien składać się z conajmniej 20 znaków.' }
    ]
  };

  initiator_id = -1;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private alertController: AlertController,
    private issueService: IssueService,
    private deviceService: DeviceService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initializeForm();
   }

  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.initiator_id) {
        this.initiator_id = JSON.parse(params.initiator_id);
      }
    });
    
  }

  ionViewWillLeave() {
    this.issueForm.clearValidators();
    this.issueForm.reset();
    this.allConnections = [];
    this.initializeForm();
  }

  initializeForm() {
    this.issueForm = this.formBuilder.group({
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(20)
      ]))
    });
  }

  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  async addAlert() {
    const alert = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: 'Czy napewno dodać zgłoszenie?',
      buttons: [
        {
          text: 'Dodaj',
          role: 'add',
          handler: () => {
            this.addIssue();
          }
        },
        {
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {
            this.presentToast('Anulowano dodawanie.', 1000);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteAlert(object) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: 'Czy napewno usunąć powiązanie?',
      buttons: [
        {
          text: 'Usuń',
          role: 'delete',
          handler: () => {
            this.deleteConnection(object);
            this.presentToast('Powiązanie usunięte.', 1000);
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

  async addConnection() {
    const modal = await this.modalController.create({
      component: NotificationDeviceAddPage
    });
    modal.onDidDismiss().then((data) => {
      this.allConnections = this.allConnections.concat(data['data']);
    });
    return await modal.present();
  }

  async deleteConnection(object) {
    let index = this.allConnections.indexOf(object, 0);
    if (index > -1) {
      this.allConnections.splice(index, 1);
    }
  }

  onConnectionActivate(event) {
    let connection = event.row;
    this.deleteAlert(connection);
  }

  addIssue() {
    const description = this.issueForm.get('description').value;
    const date = new Date();
    const dateToGo = [date];
    const tab = [description, date];
    
    let id = -1;
    this.issueService.addIssue(tab, this.initiator_id).subscribe( response => {
      if (response === true) {
        if (this.allConnections.length > 0) {
          this.issueService.getIssueByDate(dateToGo).subscribe( response => {
            id = response[0].id_i;
            this.allConnections.forEach( device => {
              device.id_i = id;
              this.deviceService.addDevice(device).subscribe( response => {});
            });
            this.presentToast('Pomyślnie dodano zgłoszenie.', 1000);
           });
        } else {
          this.presentToast('Pomyślnie dodano zgłoszenie.', 1000);
        }
      } else {
        this.presentToast('Wystąpił błąd podczas dodawania zgłoszenia.', 1000);
      }
    });

    this.issueForm.clearValidators();
    this.issueForm.reset();
    this.initializeForm();
  }

}
