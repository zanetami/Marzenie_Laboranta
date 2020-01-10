import { Component } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { NotificationDeviceAddPage } from '../notification-device-add/notification-device-add.page';
import { Device } from 'src/app/models/device';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private alertController: AlertController
  ) { 
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
            this.presentToast('Zgłoszenie dodane.', 1000);
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
     // stworz obiekt issue i dodaj do bazy
     // stworz foreach connection i dodaj obiekty do bazy
    this.issueForm.get('description').setValue('');
    this.issueForm.get('description').untouched;
    this.initializeForm();
  }

}
