import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ValidationError } from 'ngx-awesome-uploader';
import { LayoutService } from 'src/app/config/services/layout.service';

import { UserInfrastructure } from '../../infrastructure/user.infraestructure';
import { FilPickerAdapter } from '../market-edit/file-picker.adapter';

@Component({
  selector: 'app-modal-market',
  templateUrl: './modal-market.component.html',
  styleUrls: ['./modal-market.component.css'],
})
export class ModalMarketComponent implements OnInit {
  public adapter = new FilPickerAdapter(this.http, this.layoutService);
  frmMarket: FormGroup;
  submited = false;
  foto: string;
  constructor(
    private ref: MatDialogRef<ModalMarketComponent>,
    private http: HttpClient,
    private readonly user: UserInfrastructure,
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private layoutService: LayoutService
  ) {}
  ngOnInit() {
    this.layoutService.foto.subscribe((result: any) => {
      this.foto = result;
    });

    this.loadForm();
  }

  closePopUp() {
    this.ref.close();
  }

  loadForm() {
    this.frmMarket = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.required,
      ]),
      direccion: new FormControl(''),
      link: new FormControl(''),
      responsable: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      foto: new FormControl(''),
      estado: new FormControl(1)
    });
  }

  public uploadSuccess(event): void {
  }

  public onValidationError(error: ValidationError): void {
  }

  crear() {
    this.submited = true;
    try {
      if (!this.frmMarket.valid) {
        return;
      }

      this.frmMarket.controls['foto'].setValue(this.foto);
      this.user.createMarket(this.frmMarket.value).subscribe({
        next: (res) => {
          this.ref.close();
        },
        error(err) {},
      });
    } catch (error) {}
  }
}
