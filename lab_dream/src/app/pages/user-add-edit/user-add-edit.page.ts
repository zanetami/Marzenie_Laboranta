import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { User } from 'src/app/models/user';
import { ToastController, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.page.html',
  styleUrls: ['./user-add-edit.page.scss'],
})
export class UserAddEditPage {

  title = 'Dodaj użytkownika';
  userToEdit: User;

  userForm: FormGroup;
  matchPasswordForm: FormGroup;

  errorMessages = {
    login: [
      { type: 'required', message: 'Login jest wymagany' },
      { type: 'minLength', message: 'Login musi mieć min. 6 znaków' },
      { type: 'pattern', message: 'Login musi mieć min. 6 znaków'}
    ],
    password: [
      { type: 'required', message: 'Hasło jest wymagane' },
      { type: 'minLength', message: 'Hasło musi mieć przynajmniej 8 znaków' },
      {
        type: 'pattern',
        message: 'Hasło musi posiadać min. 1 wielką literę, 1 małą literę, 1 znak specjalny, 1 cyfrę i być dłgie na min. 8 znaków '
      }
    ],
    confirmPassword: [
      { type: 'required', message: 'Powtórne podanie hasła jest wymagane' },
      { type: 'MatchPassword', message: 'Hasła muszą być takie same'}
    ],
    firstName: [
      { type: 'required', message: 'Imię jest wymagane' },
      { type: 'pattern', message: 'Imię może zawierać tylko litery (wielkie, małe, polskie znaki)'}
    ],
    lastName: [
      { type: 'required', message: 'Nazwisko jest wymagane' },
      { type: 'pattern', message: 'Nazwiskomoże zawierać tylko litery (wielkie, małe, polskie znaki) i znak -'}
    ],
    role: [
      { type: 'required', message: 'Rola jest wymagana.' },
    ],
    company: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private alertController: AlertController,
    private userService: UserService
  ) { 
    this.userForm = this.formBuilder.group({
      role: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      company: new FormControl('', Validators.compose([])),
      login: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^.{6,}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required
      ])),
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zżźćńłśąęóA-ZŃĆŹŻĄŚŁÓĘ]{2,}')
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zżźćńłśąęóA-ZŃĆŹŻĄŚŁÓĘ-]{2,}')
      ])),
    }, {
      validators: this.matchPassword
    });

    this.route.queryParams.subscribe(params => {
      if (params && params.user) {
        this.userToEdit = JSON.parse(params.user);
        this.title = 'Edytuj użytkownika';
        this.fillForm();
      } else {
        this.title = 'Dodaj użytkownika';
      }
    });
  }

  matchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password').value;
    let confirmPassword = abstractControl.get('confirmPassword').value;
    if (password !== confirmPassword) {
        abstractControl.get('confirmPassword').setErrors({
          MatchPassword: true
        });
    } else {
      return null;
    }
  }

  fillForm() {
    this.userForm.get('login').setValue(this.userToEdit.login);
    this.userForm.get('firstName').setValue(this.userToEdit.name);
    this.userForm.get('lastName').setValue(this.userToEdit.lastname);
    this.userForm.get('role').setValue(this.userToEdit.role);
    this.userForm.get('company').setValue(this.userToEdit.company);
  }

  backToUserManagement() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        getUsers: true
      }
    };
    this.router.navigate(['logged/user-management'], navigationExtras);
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
      message: 'Czy napewno dodać użytkownika?',
      buttons: [
        {
          text: 'Dodaj',
          role: 'add',
          handler: () => {
            this.addUser();
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

  saveUser() {
    if (this.title === 'Dodaj użytkownika') {
      this.addAlert();
    } else if (this.title === 'Edytuj użytkownika') {
      this.editUser();
    }
  }

  editUser() {
    let login = this.userForm.get('login').value;
    let password = this.userForm.get('password').value;
    let name = this.userForm.get('firstName').value;
    let lastName = this.userForm.get('lastName').value;
    let role = this.userForm.get('role').value;
    let company = this.userForm.get('company').value;
    let user: User = 
    {
      id_u: null,
      login: login,
      password: password,
      name: name,
      lastname: lastName,
      role: role,
      company: company
    };
    this.userService.updateUser(user, this.userToEdit.id_u).subscribe( response => {
      if (response == true) {
        this.userForm.reset();
        this.userForm.clearValidators();
        this.presentToast('Edytowano użytkownika.', 1000);
        this.backToUserManagement();
      } else {
        this.presentToast('Login jest już zajęty.', 1000);
      }
    });
  }

  addUser() {
    let login = this.userForm.get('login').value;
    let password = this.userForm.get('password').value;
    let name = this.userForm.get('firstName').value;
    let lastName = this.userForm.get('lastName').value;
    let role = this.userForm.get('role').value;
    let company = this.userForm.get('company').value;
    let user: User = 
    {
      id_u: null,
      login: login,
      password: password,
      name: name,
      lastname: lastName,
      role: role,
      company: company
    };
    this.userService.registerUser(user).subscribe( response => {
      if (response == true) {
        this.userForm.reset();
        this.userForm.clearValidators();
        this.presentToast('Dodano użytkownika.', 1000);
      } else {
        this.presentToast('Login jest już zajęty.', 1000);
      }
    });
  }

}
