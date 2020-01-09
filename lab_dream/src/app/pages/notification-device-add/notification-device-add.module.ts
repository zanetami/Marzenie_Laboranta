import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationDeviceAddPage } from './notification-device-add.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationDeviceAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotificationDeviceAddPage]
})
export class NotificationDeviceAddPageModule {}
