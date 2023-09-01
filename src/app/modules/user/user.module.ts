import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { FilePickerModule } from 'ngx-awesome-uploader';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  CreateProductComponent,
} from './interface/create-product/create-product.component';
import {
  DetailProductComponent,
} from './interface/detail-product/detail-product.component';
import {
  MarketEditComponent,
} from './interface/market-edit/market-edit.component';
import { MarketComponent } from './interface/market/market.component';
import {
  ModalMarketProductComponent,
} from './interface/modal-market-product/modal-market-product.component';
import {
  ModalMarketComponent,
} from './interface/modal-market/modal-market.component';
import { PerfilComponent } from './interface/perfil/perfil.component';
import { ProductComponent } from './interface/product/product.component';
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
    FilterPipe,
    MarketComponent,
    ProductComponent,
    ModalMarketComponent,
    MarketEditComponent,
    CreateProductComponent,
    ModalMarketProductComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    MatButtonToggleModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    FilePickerModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class UserModule {}
