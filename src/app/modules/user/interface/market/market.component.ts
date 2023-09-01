import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { LayoutService } from 'src/app/config/services/layout.service';

import { UserInfrastructure } from '../../infrastructure/user.infraestructure';
import { ModalMarketComponent } from '../modal-market/modal-market.component';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
})
export class MarketComponent implements OnInit {
  constructor(
    private layoutService: LayoutService,
    private readonly router: Router,
    private readonly userAdmin: UserInfrastructure,
    public dialog: MatDialog
  ) {
    this.layoutService.configuration = { header: true, menu: true };

  }

  ngOnInit() {}

  openDialog() {
   this.dialog.open(ModalMarketComponent, {
    width: '60%'
   })
  }

  edit(){
    this.router.navigate([`/administrator/market/edit/${1}`]);
  }

}
