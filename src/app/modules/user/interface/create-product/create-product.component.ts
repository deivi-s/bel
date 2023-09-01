import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ValidationError } from 'ngx-awesome-uploader';

import { FilPickerAdapter } from '../market-edit/file-picker.adapter';
import {
  ModalMarketProductComponent,
} from '../modal-market-product/modal-market-product.component';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  public adapter = new FilPickerAdapter(this.http);

  constructor(private http: HttpClient,  public dialog: MatDialog) {
    
  }

  ngOnInit(): void {}

  public uploadSuccess(event): void {
    /* console.log(event); */
  }

  public onValidationError(error: ValidationError): void {
    /* alert(`Validation Error ${error.error} in ${error.file?.name}`); */
  }

  addMarket(){
    this.dialog.open(ModalMarketProductComponent, {
      width: '60%'
     })
  }
}
