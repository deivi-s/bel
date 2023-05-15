import { UserModule } from './modules/user/user.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './config/modules/layout.module';
import { LAYOUT_CONSTANTS } from './config/constants/layout.constants';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {
    path: 'recommendation',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule)
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule)
  },
  {
    path: '**',
    redirectTo: '/',
  }
];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    LayoutModule.forRoot(LAYOUT_CONSTANTS),
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
