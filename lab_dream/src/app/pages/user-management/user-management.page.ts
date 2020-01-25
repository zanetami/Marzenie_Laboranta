import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { LoggedUserService } from 'src/app/services/logged-user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage{

  columnMode = ColumnMode;
  columns = [];
  rows: User[] = [];

  canDeleteUser = false;
  loggedUser;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertController: AlertController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private loggedUserService: LoggedUserService
  ) {}

  ionViewWillEnter() {
    this.loggedUser = this.loggedUserService.loggedUser;
    this.activatedRoute.queryParams.subscribe(params => {
      this.getAllUsers();
    });
    this.specifyColumns();
    this.getAllUsers();
  }

  ionViewWillLeave() {
    this.canDeleteUser = false;
    this.rows = [];
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe( response => {
      this.rows = response;
    });
  }

  specifyColumns() {
    this.columns = [
      {
        name: 'Login',
        prop: 'login'
      },
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
    if (object.id_u === this.loggedUser.id_u) {
      this.presentToast('Nie możesz usunąć swojego konta.', 1000);
    } else {
      this.userService.deleteUser(object.id_u).subscribe( response => {
        if (response == true) {
          this.presentToast('Użytkownik usunięty.', 1000);
          this.getAllUsers();
        } else if (response === false ) {
          this.presentToast('Nie możesz usunąć użytkownika z przydzielonym zgłoszeniem.', 1000);
        }
      });
    }
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
