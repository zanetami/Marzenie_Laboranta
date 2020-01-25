import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoggedUserService } from 'src/app/services/logged-user.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.page.html',
  styleUrls: ['./logged.page.scss'],
})
export class LoggedPage {

  loggedUser;

  constructor(
    private loggedUserService: LoggedUserService
  ) {
    this.loggedUser = this.loggedUserService.loggedUser;
  }


}
