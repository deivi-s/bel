import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';

import { ValidationError } from 'ngx-awesome-uploader';

import { FilPickerAdapter } from './file-picker.adapter';

@Component({
  selector: 'app-market-edit',
  templateUrl: './market-edit.component.html',
  styleUrls: ['./market-edit.component.css'],
})
export class MarketEditComponent implements OnInit {

  public adapter = new FilPickerAdapter(this.http)
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  public uploadSuccess(event): void {
    /* console.log(event); */
  }

  public onValidationError(error: ValidationError): void {
    /* alert(`Validation Error ${error.error} in ${error.file?.name}`); */
  }
}
