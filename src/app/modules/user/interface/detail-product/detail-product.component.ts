import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LayoutService } from 'src/app/config/services/layout.service';

import { UserInfrastructure } from '../../infrastructure/user.infraestructure';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  productId: number;
  porcentaje: number;
  constructor(
    private readonly routerActive: ActivatedRoute,
    private readonly userAdmin: UserInfrastructure,
    private layoutService: LayoutService
  ) { this.layoutService.configuration = { header: true, menu: true }; }
  product: any;

  async ngOnInit() {
    this.productId = Number(this.routerActive.snapshot.paramMap.get('id'));
    this.porcentaje = Number(
      this.routerActive.snapshot.paramMap.get('porcentaje')
    );
    await this.details(this.productId);
  }

  async details(id: number) {
    await this.userAdmin
      .productDetailtById(id)
      .subscribe(async (detail: any) => {
        this.product = detail;
        console.log(
          '%cdetail-product.component.ts line:33 this.product',
          'color: #007acc;',
          this.product
        );
      });
  }
}
