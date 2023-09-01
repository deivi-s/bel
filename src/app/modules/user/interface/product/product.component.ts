import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from 'src/app/config/services/layout.service';

import { UserInfrastructure } from '../../infrastructure/user.infraestructure';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private layoutService: LayoutService,
    private readonly router: Router,
    private readonly userAdmin: UserInfrastructure
  ) {
    this.layoutService.configuration = { header: true, menu: true };
  }

  ngOnInit() {}

  create(){
    this.router.navigate([`/administrator/product/create`]);

  }
}
