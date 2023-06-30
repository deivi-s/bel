import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from 'src/app/shared/shared.module';

import {
  DetailProductComponent,
} from './interface/detail-product/detail-product.component';
import { PerfilComponent } from './interface/perfil/perfil.component';
import { RecommendComponent } from './interface/recommend/recommend.component';
import { FilterPipe } from './interface/user/filter.pipe';
import { UserComponent } from './interface/user/user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserComponent,
    DetailProductComponent,
    RecommendComponent,
    PerfilComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    MatButtonToggleModule,
    FormsModule
  ]
})
export class UserModule { }
