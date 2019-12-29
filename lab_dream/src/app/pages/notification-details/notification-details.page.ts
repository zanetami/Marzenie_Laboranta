import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.page.html',
  styleUrls: ['./notification-details.page.scss'],
})
export class NotificationDetailsPage implements OnInit {

  columnMode = ColumnMode;
  issue;
  connectedDevices: Device[] = [];
  columns = [
    {
      name: 'Identyfikator',
      prop: 'id_d'
    },
    {
      name: 'Typ',
      prop: 'type'
    },
    {
      name: 'Marka',
      prop: 'brand'
    },
    {
      name: 'Model/wersja',
      prop: 'model'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.issue) {
        this.issue = JSON.parse(params.issue);
      }
    });
  }

  ngOnInit() {
    this.getConnectedDevices();
  }

  getConnectedDevices() {
    //this.connectedDevices = getfromAPI gdzie lab sie zgadza
    // id_d: number;
    // type: string;
    // brand: string;
    // model: string;
    this.connectedDevices = [
      {id_d: 'BHBi67', type: 'Sprzęt', brand: 'Samsung', model: 'Note5', lab: ''},
      {id_d: 'QHJ78J', type: 'oprogramowanie', brand: 'mathematica', model: '8.1', lab: ''},
      {id_d: 'MOX5D7', type: 'sieć', brand: 'internet', model: '', lab: ''},
    ]
  }

}
