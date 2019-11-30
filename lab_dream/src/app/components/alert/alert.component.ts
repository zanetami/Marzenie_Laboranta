import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  constructor(
    private alertController: AlertController,
    private alertService: AlertService
  ) { }

  ngOnInit() {}

  async questionAlert(question) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: question,
      buttons: [
        {
          text: 'Usuń',
          role: 'delete',
          handler: () => {
            this.alertService.setResponse(true);
          }
        },
        {
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {
            this.alertService.setResponse(false);
          }
        }
      ]
    });

    await alert.present();
  }

}
