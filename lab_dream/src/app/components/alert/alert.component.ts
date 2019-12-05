import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  constructor(
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  public async questionAlert(question) {
      const alert = await this.alertController.create({
        // header: 'Alert',
        // subHeader: 'Subtitle',
        message: question,
        buttons: [
          {
            text: 'Usuń',
            role: 'delete',
            handler: () => {
              return true;
            }
          },
          {
            text: 'Anuluj',
            role: 'cancel',
            handler: () => {
              return false;
            }
          }
        ]
      });

      await alert.present();
      return false;
  }

}
