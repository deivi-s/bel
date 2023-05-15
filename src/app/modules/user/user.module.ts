import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './interface/user/user.component';
import { UserRoutingModule } from './user-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ]
})
export class UserModule { }
