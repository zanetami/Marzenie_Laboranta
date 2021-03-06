import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Device } from 'src/app/models/device';

@Component({
  selector: 'app-notification-device-add',
  templateUrl: './notification-device-add.page.html',
  styleUrls: ['./notification-device-add.page.scss'],
})
export class NotificationDeviceAddPage {

  deviceForm: FormGroup;
  connections: Device[] = [];

  errorMessages = {
    lab: [
      { type: 'required', message: 'Sala jest wymagana.' },
      { type: 'maxLength', message: 'Numer sali jest za długi.' }
    ],
    id_d: [
      { type: 'pattern', message: 'Kod może składać się tylko z liczb.' },
      { type: 'maxLength', message: 'Numer identyfikacyjny jest za długi.' }
    ],
    type: [
      { type: 'required', message: 'Typ jest wymagany.' }
    ]
  };

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.deviceForm = this.formBuilder.group({
      lab: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(5)
      ])),
      id_d: new FormControl('', Validators.compose([
        Validators.maxLength(7),
        Validators.pattern('^[0-9].{1,7}$')
      ])),
      type: new FormControl('', Validators.required)
    });
  }

  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  addConnection() {
    let idInput = this.deviceForm.get('id_d').value;
    let labInput = this.deviceForm.get('lab').value;
    let typeSelect = this.deviceForm.get('type').value;
    let element: Device = {id_d: idInput, type: typeSelect, lab: labInput, id_i: null};
    this.connections = this.connections.concat(element);
    this.presentToast('Dodano powiązanie.', 1000);

    this.deviceForm.clearValidators()
    this.deviceForm.reset()
    this.initializeForm();
  }

  closeModal() {
    this.modalController.dismiss(this.connections);
    this.connections = [];
  }
}
