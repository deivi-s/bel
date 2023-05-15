import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './interface/user/user.component';
import { DetailProductComponent } from './interface/detail-product/detail-product.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'detail/:id',
    component: DetailProductComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
