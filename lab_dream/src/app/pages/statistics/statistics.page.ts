import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { StatisticsService } from 'src/app/services/statistics.service';

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
  public chartData: MultiDataSet = [[0,0,0],[0,0,0],[0,0,0]];

  userSelect = ' Wszyscy';
  allUsers = [{id_u: null, login: null, password: null, name: 'Wszyscy', lastname: null, company: null, role: null}];
  
  constructor(
    private router: Router,
    private userService: UserService,
    private statisticsService: StatisticsService
  ) { }

  ionViewWillEnter() {
    this.getAllUsers();
    this.codeSelected();
  }

  ionViewWillLeave() {
    this.allUsers = [{id_u: null, login: null, password: null, name: 'Wszyscy', lastname: null, company: null, role: null}];
    this.userSelect = '';
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe( response => {
      response.forEach(element => {
        if (element.role === 'Serwisant') {
          this.allUsers.push(element);
        }
      });
    });
  }

  codeSelected() {
    let id = this.userSelect.substring(0, 2);
    if (id.length === 0 || id === ' W') {
      this.statisticsService.getStats().subscribe( table => {
        this.chartData = [
          [table[0], table[1], table[2]],
          [table[3], table[4], table[5]],
          [table[6], table[7], table[8]],
        ];
      });
    } else {
      this.statisticsService.getStatsUser(id).subscribe( table => {
        this.chartData = [
          [table[0], table[1], table[2]],
          [table[3], table[4], table[5]],
          [table[6], table[7], table[8]],
        ];
      });
    }
  }

  logOut() {
    this.router.navigate(['']);
  }



}
