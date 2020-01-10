import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage {

  columnMode = ColumnMode;
  columns = [];
  rows = [
    {id_u: 1,name: 'Hubert', lastname: 'Wawrzacz', company: 'super comp',role: 'Administrator'},
    {id_u: 2,name: 'Hubert', lastname: 'aasdsadas', company: 'corpo rat',role: 'Administrator'},
    {id_u: 3,name: 'dsadsadsa', lastname: 'Wawrzacz', company: 'szkoła politechnika',role: 'Administrator'},
    {id_u: 4,name: 'Julia', lastname: 'Iskierka', company: 'super comp',role: 'Serwisant'},
    {id_u: 5,name: 'fdsfds', lastname: 'Iskierka', company: 'szkoła politechnika',role: 'Serwisant'},
    {id_u: 6,name: 'Julia', lastname: 'sfddsfds', company: 'corpo rat',role: 'Serwisant'},
    {id_u: 7,name: 'Szymon', lastname: 'Lipiec', company: 'szkoła politechnika',role: 'Użytkownik'},
    {id_u: 8,name: 'vfdsvfv', lastname: 'Lipiec', company: 'corpo rat',role: 'Użytkownik'},
    {id_u: 9,name: 'Szymon', lastname: 'dsfvfdsvdfv', company: 'super comp',role: 'Użytkownik'},
  ];

  canDeleteUser = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ionViewWillEnter() {
    this.specifyColumns();
  }

  specifyColumns() {
    this.columns = [
      {
        name: 'Imię',
        prop: 'name'
      },
      {
        name: 'Nazwisko',
        prop: 'lastname'
      },
      {
        name: 'Rola',
        prop: 'role'
      },
      {
        name: 'Organizacja',
        prop: 'company'
      }
    ];
  }

    // #region popupy
    async presentToast(message, duration) {
      const toast = await this.toastController.create({
        message: message,
        duration: duration
      });
      toast.present();
    }
  
    async deleteAlert(userObject) {
      const alert = await this.alertController.create({
        // header: 'Alert',
        // subHeader: 'Subtitle',
        message: 'Czy napewno usunąć użytkownika?',
        buttons: [
          {
            text: 'Usuń',
            role: 'delete',
            handler: () => {
              this.deleteUser(userObject);
              this.presentToast('Użytkownik usunięty.', 1000);
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
      if ( this.canDeleteUser ) {
        this.deleteAlert(event.row);
      } else {
        this.saveUser(event.row);
      }
    }
  }

  // #region usuwanie użytkownika
  deleteUser(object) {
    const index = this.rows.indexOf(object);
    return this.rows.splice(index, 1);
  }

  deleteUserActivated() {
    this.canDeleteUser = !this.canDeleteUser;
  }
  //#endregion

  // #region dodawanie/edycja użytkownika
  saveUser(object?) {
    if (object) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          user: JSON.stringify(object)
        }
      };
      this.router.navigate(['logged/user-add-edit'], navigationExtras);
    } else {
      this.router.navigate(['logged/user-add-edit']);
    }
  }

  // #endregion

}
