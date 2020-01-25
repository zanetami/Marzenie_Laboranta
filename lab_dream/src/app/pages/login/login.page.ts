import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';
import { LoggedUserService } from 'src/app/services/logged-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm: FormGroup;

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
    ]
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastController: ToastController,
    private loggedUserService: LoggedUserService
  ) {
    this.initializeForm();
  }
  

  ionViewWillLeave() {
    this.loginForm.clearValidators()
    this.loginForm.reset()
    this.initializeForm();
  }

  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      login: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^.{6,}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ]))
    });
  }


  authorize() {
    const login = this.loginForm.get('login').value;
    const password = this.loginForm.get('password').value;
    this.userService.loginUser(login, password).subscribe ( response => {
      if (response !== false) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            loggedUser: JSON.stringify(response)
          }
        };
        this.loggedUserService.loggedUser = response;
        this.router.navigate(['/logged/notifications'], navigationExtras);
        this.loginForm.clearValidators()
        this.loginForm.reset()
        this.initializeForm();
      } else {
        this.presentToast('Taki użytkownik nie istnieje.', 1000);
      }
    });
  }

}
