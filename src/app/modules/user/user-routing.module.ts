import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

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
import { PerfilComponent } from './interface/perfil/perfil.component';
import { ProductComponent } from './interface/product/product.component';
import { RecommendComponent } from './interface/recommend/recommend.component';
import { UserComponent } from './interface/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'detail/:id/:porcentaje',
    component: DetailProductComponent
  },
  {
    path: 'questions',
    component: RecommendComponent
  },
  {
    path: 'user',
    component: PerfilComponent
  },
  {
    path: 'markets',
    component: MarketComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'market/edit/:id',
    component: MarketEditComponent
  },
  {
    path: 'product/create',
    component: CreateProductComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
