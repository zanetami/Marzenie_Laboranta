import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/main/main.module#MainPageModule' },
  { path: 'logged', loadChildren: './pages/logged/logged.module#LoggedPageModule' },
  { 
    path: 'notification-details',
    loadChildren: './pages/notification-details/notification-details.module#NotificationDetailsPageModule'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
