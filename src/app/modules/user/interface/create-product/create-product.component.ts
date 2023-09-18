import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ValidationError } from 'ngx-awesome-uploader';

import {
  ConfigProductComponent,
} from '../config-product/config-product.component';
import { FilPickerAdapter } from '../market-edit/file-picker.adapter';
import {
  ModalMarketProductComponent,
} from '../modal-market-product/modal-market-product.component';
import { UserInfrastructure } from '../../infrastructure/user.infraestructure';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/config/services/layout.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  public adapter = new FilPickerAdapter(this.http, this.layoutService);
  idProduct: number;
  frmProduct: FormGroup;
  submited = false;
  foto: string;
  listDescription: any[] = [];
  listMarkets: any[] = [];
  listMarketsCopy: any[] = [];
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private readonly userAdmin: UserInfrastructure,
    private formBuilder: FormBuilder,
    private layoutService: LayoutService) {

  }

  ngOnInit(): void {
    this.loadForm();
    this.createrProduct();
    this.layoutService.foto.subscribe((result: any) => {
      this.foto = result;
    });
    this.getAllMarkets();
  }

  getAllMarkets() {
    this.userAdmin.getMarkets().subscribe((data: any) => {
      this.listMarketsCopy = data;
    });
  }

  loadDescription(id: number) {
    this.userAdmin.getDescriptionProduct(id).subscribe((data: any) => {
      this.listDescription = data
    });
  }
  loadForm() {
    this.frmProduct = this.formBuilder.group({
      id_categoria: new FormControl(''),
      id_sub_categoria: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl(''),
      foto: new FormControl(''),
      estado: new FormControl(1)
    });
  }

  createrProduct() {
    if (!this.idProduct) {
      this.userAdmin.createProduct(null).subscribe((data: any) => {
        this.idProduct = data;
        this.loadDescription(data);
        this.getByIdAllMarkets(data);
      });
    }
  }

  getByIdAllMarkets(id: any) {
    this.userAdmin.getMarketProduct(id).subscribe((data: any) => {
      let resultFilter = this.listMarketsCopy.filter((market) => data.some(element => element.id_ubicacion === market.id));
      this.listMarkets = resultFilter;

    });
  }


  deleteRow(index: number) {
    this.listDescription.splice(index, 1);
  }

  addDescription() {
    this.listDescription.push({
      id_producto: this.idProduct,
      titulo: '',
      descripcion: ''
    })
  }

  public uploadSuccess(event): void {
    /* console.log(event); */
  }

  public onValidationError(error: ValidationError): void {
    /* alert(`Validation Error ${error.error} in ${error.file?.name}`); */
  }

  addMarket() {
    const dialog =  this.dialog.open(ModalMarketProductComponent, {
      width: '60%',
      data: { idProduct: this.idProduct }
    })

    dialog.afterClosed().subscribe(() => {
      this.getByIdAllMarkets(this.idProduct);
    });
  }

  configProduct() {
    this.dialog.open(ConfigProductComponent, {
      width: '60%'
    })
  }

  saveDescription() {
    if (this.listDescription.length) {
      this.userAdmin.createDescriptionProduct(this.idProduct, this.listDescription).subscribe((data: any) => {
        console.log('%ccreate-product.component.ts line:111 data', 'color: #007acc;', data);
      });
    }
  }

  save() {
    this.submited = true;
    try {
      if (!this.frmProduct.valid) {
        return;
      }

      this.frmProduct.controls['foto'].setValue(this.foto);
      console.log('%cmodal-market.component.ts line:84 this.frmMarket.value', 'color: #007acc;', this.frmProduct.value);
      /* this.user.createMarket(this.frmMarket.value).subscribe({
        next: (res) => {
          this.ref.close();
        },
        error(err) {},
      }); */
    } catch (error) { }
  }
}
