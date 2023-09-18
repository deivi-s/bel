import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ModalMarketComponent } from '../modal-market/modal-market.component';
import { UserInfrastructure } from '../../infrastructure/user.infraestructure';

@Component({
  selector: 'app-modal-market-product',
  templateUrl: './modal-market-product.component.html',
  styleUrls: ['./modal-market-product.component.css'],
})
export class ModalMarketProductComponent implements OnInit {

  listMarkets: any[] = [];
  listMarketsCopy: any[] = [];
  idProduct: number;
  getlistMarkets: any[] = [];
  constructor(
    private ref: MatDialogRef<ModalMarketComponent>,
    private readonly userAdmin: UserInfrastructure,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getByIdAllMarkets(this.data.idProduct);
    this.getAllMarkets();
  }

  closePopUp() {
    this.ref.close();
  }

  getByIdAllMarkets(id: number) {
    this.userAdmin.getMarketProduct(id).subscribe((data: any) => {
      this.getlistMarkets = data;
    });
  }

  getAllMarkets() {
    this.userAdmin.getMarkets().subscribe((data: any) => {
      this.listMarkets = data;
      this.listMarketsCopy = this.listMarkets;
      if (this.getlistMarkets.length) {
        this.getlistMarkets.map((market: any) => {
          this.listMarkets.map((keyMarket, i) => {
            if (market.id_ubicacion === keyMarket.id) {
              this.listMarkets[i].checked = true;
            }
          });

          this.listMarketsCopy.map((keyMarket, i) => {
            if (market.id_ubicacion === keyMarket.id) {
              this.listMarketsCopy[i].checked = true;
            }
          });
        });

      } else {
        this.listMarkets.map((key, i) => {
          this.listMarkets[i].checked = false;
        });

        this.listMarketsCopy.map((key, i) => {
          this.listMarketsCopy[i].checked = false;
        });
      }
    });
  }

  valueChange(value: any, index: number) {
    const valor = value.checked;
    this.listMarkets[index].checked = valor;
  }


  buscar(text: any) {

    const palabra = text.target.value.toUpperCase();
    const marketResult = this.listMarketsCopy.filter((key) => key.nombre.toUpperCase().indexOf(palabra) === 0);
    this.listMarkets = marketResult;
  }

  guardar() {

    let locations: any[] = [];
    const filter = this.listMarkets.filter((key) => key.checked === true);

    filter.map((key) => {
      locations.push({
        id_producto: this.data.idProduct,
        id_ubicacion: key.id
      })
    })

    if (locations.length) {
      this.userAdmin.saveMarketProduct(locations).subscribe();
    }
    this.ref.close();
    locations = [];

  }
}
