import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { LayoutService } from 'src/app/config/services/layout.service';

import { UserInfrastructure } from '../../infrastructure/user.infraestructure';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  userGroup: FormGroup;
  submited = false;
  userDataProfile: any;
  fileAttr = 'Foto de perfil';
  photo: string;
  @ViewChild('fileInput') fileInput!: ElementRef;
  id: number;
  constructor(
    private layoutService: LayoutService,
    private readonly user: UserInfrastructure,
    private formBuilder: FormBuilder
  ) {
    this.layoutService.configuration = { header: true, menu: true };
    this.loadFormData();
    this.getDataUser();
  }

  loadFormData() {
    this.userGroup = this.formBuilder.group({
      id: new FormControl(this.userDataProfile?.id),
      nombres: new FormControl(
        this.userDataProfile?.nombres,
        Validators.required
      ),
      apellidos: new FormControl(
        this.userDataProfile?.apellidos,
        Validators.required
      ),
      email: new FormControl(this.userDataProfile?.email, [
        Validators.required,
        Validators.email,
      ]),
      celular: new FormControl(
        this.userDataProfile?.celular,
        Validators.required
      ),
      pais: new FormControl(this.userDataProfile?.pais),
      region: new FormControl(
        this.userDataProfile?.region
      ),
      foto: new FormControl(this.userDataProfile?.foto),
    });

    this.photo = this.userDataProfile?.foto;
  }

  ngOnInit(): void {}

  getDataUser() {
    this.id =
      this.layoutService.userData?.getValue() || localStorage.getItem('id');
    this.user.getUser(this.id).subscribe((user: any) => {
      this.userDataProfile = user;
      this.loadFormData();
    });
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name;
      });
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
          this.photo = imgBase64Path;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Cargar archivo';
    }
  }

  guardar() {

    this.submited = true;
    this.userGroup.value.foto =  this.photo ?  this.photo : this.userGroup.value.foto;
    if (!this.userGroup.valid) {
      return;
    }

    this.user.updateUser(this.userGroup.value).subscribe((user: any) => {
      console.log(
        '%cperfil.component.ts line:102 user',
        'color: #007acc;',
        user
      );
    });
  }
}
