import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/main/main.module#MainPageModule' },
  { 
    path: 'logged', 
    loadChildren: './pages/logged/logged.module#LoggedPageModule'
  },
  { 
    path: 'logged/user-add-edit',
    loadChildren: './pages/user-add-edit/user-add-edit.module#UserAddEditPageModule'
  },
  { 
    path: 'logged/notification-details',
    loadChildren: './pages/notification-details/notification-details.module#NotificationDetailsPageModule'
  },
  { 
    path: 'logged/notification-add', 
    loadChildren: './pages/notification-add/notification-add.module#NotificationAddPageModule'
  },
  { 
    path: 'logged/notification-device-add', 
    loadChildren: './pages/notification-device-add/notification-device-add.module#NotificationDeviceAddPageModule'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
