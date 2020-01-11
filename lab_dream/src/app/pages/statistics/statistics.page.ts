import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage {

  public chartLabels: Label[] = ['Powiadomiono', 'Przyjęto', 'Rozwiązano'];
  public chartType: ChartType = 'doughnut';
  public options: any = {
    legend: { position: 'bottom' }
  }
  public chartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];

  userSelect: User;
  allUsers = [
    {},
    {id_u: 4,name: 'Julia', lastname: 'Iskierka', company: 'super comp',role: 'Serwisant'},
    {id_u: 5,name: 'fdsfds', lastname: 'Iskierka', company: 'szkoła politechnika',role: 'Serwisant'},
    {id_u: 6,name: 'Julia', lastname: 'sfddsfds', company: 'corpo rat',role: 'Serwisant'},
    {id_u: 7,name: 'Szymon', lastname: 'Lipiec', company: 'szkoła politechnika',role: 'Użytkownik'},
    {id_u: 8,name: 'vfdsvfv', lastname: 'Lipiec', company: 'corpo rat',role: 'Użytkownik'},
    {id_u: 9,name: 'Szymon', lastname: 'dsfvfdsvdfv', company: 'super comp',role: 'Użytkownik'},
    {id_u: 4,name: 'Julia', lastname: 'Iskierka', company: 'super comp',role: 'Serwisant'},
    {id_u: 5,name: 'fdsfds', lastname: 'Iskierka', company: 'szkoła politechnika',role: 'Serwisant'},
    {id_u: 6,name: 'Julia', lastname: 'sfddsfds', company: 'corpo rat',role: 'Serwisant'},
    {id_u: 7,name: 'Szymon', lastname: 'Lipiec', company: 'szkoła politechnika',role: 'Użytkownik'},
    {id_u: 8,name: 'vfdsvfv', lastname: 'Lipiec', company: 'corpo rat',role: 'Użytkownik'},
    {id_u: 9,name: 'Szymon', lastname: 'dsfvfdsvdfv', company: 'super comp',role: 'Użytkownik'},
    {id_u: 4,name: 'Julia', lastname: 'Iskierka', company: 'super comp',role: 'Serwisant'},
    {id_u: 5,name: 'fdsfds', lastname: 'Iskierka', company: 'szkoła politechnika',role: 'Serwisant'},
    {id_u: 6,name: 'Julia', lastname: 'sfddsfds', company: 'corpo rat',role: 'Serwisant'},
    {id_u: 7,name: 'Szymon', lastname: 'Lipiec', company: 'szkoła politechnika',role: 'Użytkownik'},
    {id_u: 8,name: 'vfdsvfv', lastname: 'Lipiec', company: 'corpo rat',role: 'Użytkownik'},
    {id_u: 9,name: 'Szymon', lastname: 'dsfvfdsvdfv', company: 'super comp',role: 'Użytkownik'},
  ];
  
  constructor(
    private router: Router,
  ) { }

  ionViewWillEnter() {
  }

  logOut() {
    this.router.navigate(['']);
  }



}
