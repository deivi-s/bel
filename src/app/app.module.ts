import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { AppComponent } from './app.component';
import { LAYOUT_CONSTANTS } from './config/constants/layout.constants';
import { LayoutModule } from './config/modules/layout.module';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './core/interfaces/login/login.component';
import { UserApplication } from './modules/user/application/user.application';
import {
  UserInfrastructure,
} from './modules/user/infrastructure/user.infraestructure';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: 'recommendation',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'resume',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'administrator',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

const application = [UserApplication];
const infrastructure = [UserInfrastructure];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    LayoutModule.forRoot(LAYOUT_CONSTANTS),
    CoreModule,
  ],
  providers: [...infrastructure, ...application],
  bootstrap: [AppComponent],
})
export class AppModule {}
