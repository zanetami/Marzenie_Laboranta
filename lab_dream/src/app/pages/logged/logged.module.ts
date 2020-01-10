import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoggedPage } from './logged.page';

const routes: Routes = [
  {
    path: '',
    component: LoggedPage,
    children: [
      {
        path: 'notifications',
        loadChildren: '../notifications/notifications.module#NotificationsPageModule'
       },
      {
        path: 'user-management',
        loadChildren: '../user-management/user-management.module#UserManagementPageModule'
      },
      {
        path: 'statistics',
        loadChildren: '../statistics/statistics.module#StatisticsPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoggedPage]
})
export class LoggedPageModule {}
