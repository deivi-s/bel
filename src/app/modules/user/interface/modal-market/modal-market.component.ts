import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ValidationError } from 'ngx-awesome-uploader';

import { FilPickerAdapter } from '../market-edit/file-picker.adapter';

@Component({
  selector: 'app-modal-market',
  templateUrl: './modal-market.component.html',
  styleUrls: ['./modal-market.component.css'],
})
export class ModalMarketComponent implements OnInit {
  public adapter = new FilPickerAdapter(this.http);

  constructor(
    private ref: MatDialogRef<ModalMarketComponent>,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  closePopUp() {
    this.ref.close();
  }

  public uploadSuccess(event): void {
    /* console.log(event); */
  }

  public onValidationError(error: ValidationError): void {
    /* alert(`Validation Error ${error.error} in ${error.file?.name}`); */
  }
}
