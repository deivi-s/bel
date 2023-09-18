import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { FilePickerComponent, FilePreviewModel, ValidationError } from 'ngx-awesome-uploader';

import { FilPickerAdapter } from './file-picker.adapter';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfrastructure } from '../../infrastructure/user.infraestructure';
import { LayoutService } from 'src/app/config/services/layout.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-market-edit',
  templateUrl: './market-edit.component.html',
  styleUrls: ['./market-edit.component.css'],
})
export class MarketEditComponent implements OnInit {
  @ViewChild('uploader', { static: true }) uploader: FilePickerComponent; 
  public adapter = new FilPickerAdapter(this.http, this.layoutService);

  id: string;
  frmMarket: FormGroup;
  submited = false;
  foto: string
  data: any;
  constructor(private http: HttpClient, public activatedRoute: ActivatedRoute, private readonly user: UserInfrastructure, private layoutService: LayoutService, private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadForm(null);
    this.getData(this.id);
    
  }

  async loadForm(data: any) {
    this.frmMarket = this.formBuilder.group({
      id: new FormControl(data?.id, Validators.required),
      nombre: new FormControl(data?.nombre, Validators.required),
      descripcion: new FormControl(data?.descripcion, [
        Validators.required,
        Validators.required,
      ]),
      direccion: new FormControl(data?.direccion),
      link: new FormControl(data?.link),
      responsable: new FormControl(data?.responsable),
      telefono: new FormControl(data?.telefono),
      email: new FormControl(data?.email, [Validators.required, Validators.email]),
      foto: new FormControl(data?.foto),
      estado: new FormControl(1)
    });



   const base64 = await fetch(data?.foto);
   
   const blob = await base64.blob();

   console.log('%cmarket-edit.component.ts line:64 blob', 'color: #007acc;', blob);

    const files = [
      {
        fileName: data?.nombre || '',
        file: blob
      }
    ] as FilePreviewModel[];
    this.uploader.setFiles(files);

  }

  public uploadSuccess(event): void {
    /* console.log(event); */
  }

  public onValidationError(error: ValidationError): void {
    /* alert(`Validation Error ${error.error} in ${error.file?.name}`); */
  }
  
  toBlob(file: string): Observable<Blob> {
    return from(
      fetch(file)
        .then(res => res.blob())
        .then(blob => blob)
    );
  }

  getData(id: string){
    this.user.getMarketById(id).subscribe({
      next: (res) => {
       
        
        this.loadForm(res);
        console.log('%cmarket-edit.component.ts line:64 res', 'color: #007acc;', res);
      },
      error(err) { },
    });
  }

  editar() {
     /*  this.frmMarket.controls['foto'].setValue(this.foto); */
     console.log('this.data', this.data);
     console.log('%cmarket-edit.component.ts line:77 object', 'color: #007acc;', this.frmMarket.value);
    this.submited = true;
    try {
      if (!this.frmMarket.valid) {
        return;
      }

    
      this.user.editMarket(this.id, this.frmMarket.value).subscribe({
        next: (res) => {
          this.router.navigate(['/administrator/markets'])
        },
        error(err) { },
      });
    } catch (error) { }
  }
}
