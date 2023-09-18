import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { LayoutService } from 'src/app/config/services/layout.service';

import { UserInfrastructure } from '../../infrastructure/user.infraestructure';
import { ModalMarketComponent } from '../modal-market/modal-market.component';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
})
export class MarketComponent implements OnInit {
  listMarkets: any[] = [];
  constructor(
    private layoutService: LayoutService,
    private readonly router: Router,
    private readonly userAdmin: UserInfrastructure,
    public dialog: MatDialog,
    private routerActivated: ActivatedRoute
  ) {
    this.layoutService.configuration = { header: true, menu: true };

  }

  ngOnInit() {
    this.getAllMarkets();
    this.routerActivated.params.subscribe(params => {
      this.getAllMarkets();
    });

  }

  

  getAllMarkets() {
    this.userAdmin.getMarkets().subscribe({
      next: (data: any) => {
        this.listMarkets = data;
      },
    });
  }

  create() {
    this.userAdmin.getMarkets().subscribe({
      next: (data: any) => {
        this.listMarkets = data;
      },
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(ModalMarketComponent, {
      width: '60%'
    });


    dialogRef.afterClosed().subscribe(() => {
      this.getAllMarkets();
    });

  }

  edit(id: number) {
    this.router.navigate([`/administrator/market/edit/${id}`]);
  }
}
