import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage {

  constructor(
    private router: Router,
  ) { }

  ionViewWillEnter() {
  }

  logOut() {
    this.router.navigate(['']);
  }

}
