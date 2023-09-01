import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ModalMarketComponent } from '../modal-market/modal-market.component';

@Component({
  selector: 'app-modal-market-product',
  templateUrl: './modal-market-product.component.html',
  styleUrls: ['./modal-market-product.component.css'],
})
export class ModalMarketProductComponent implements OnInit {
  constructor(private ref: MatDialogRef<ModalMarketComponent>) {}

  ngOnInit() {}

  closePopUp() {
    this.ref.close();
  }
}
