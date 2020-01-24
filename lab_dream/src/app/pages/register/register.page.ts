import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm: FormGroup;
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
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastController: ToastController
  ) {
    this.registerForm = this.formBuilder.group({
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
      company: new FormControl('', Validators.compose([])),
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

  ionViewWillLeave() {
    this.registerForm.clearValidators()
    this.registerForm.reset()
  }

  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  register() {
    const login = this.registerForm.get('login').value;
    const password = this.registerForm.get('password').value;
    const firstName = this.registerForm.get('firstName').value;
    const lastName = this.registerForm.get('lastName').value;
    const company = this.registerForm.get('company').value;

    let newUser: User = {id_u: null, login: login, password: password, name: firstName, lastname: lastName, company: company, role: 'Użytkownik'};

    this.userService.registerUser(newUser).subscribe( response => {
      if (response === true) {
        this.presentToast(`Zaloguj się ${firstName}`, 1000);
        this.router.navigate(['/main/login']);
      } else {
        this.presentToast(`Login jest już zajęty.`, 1000);
      }
    })
    this.router.navigate(['/main/login']);
  }

}
