import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

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
    private formBuilder: FormBuilder
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

  ionViewWillEnter() {
  }

  register() {
    this.router.navigate(['/main/login']);
  }

}
