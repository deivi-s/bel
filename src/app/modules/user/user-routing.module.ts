import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  DetailProductComponent,
} from './interface/detail-product/detail-product.component';
import { PerfilComponent } from './interface/perfil/perfil.component';
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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
