import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { LayoutService } from 'src/app/config/services/layout.service';
import {
  UserInfrastructure,
} from 'src/app/modules/user/infrastructure/user.infraestructure';
import { environment } from 'src/environments/environment';

import { validarClaves } from './validar';

declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  active = true;
  users: FormGroup;
  formularioLogin: FormGroup;
  submited = false;
  submitedLogin = false;

  constructor(
    private layoutService: LayoutService,
    private readonly router: Router,
    private formBuilder: FormBuilder,
    private userService: LayoutService,
    private readonly user: UserInfrastructure,
    private _ngZone: NgZone,
  ) {
    this.layoutService.configuration = { header: false, menu: false };

  }

  ngAfterViewInit(): void {
    this.googleForm();
  }

  ngOnInit(): void {
    this.loadForm();
    this.googleForm();
  }

  googleForm() {
    google.accounts.id.initialize({
      client_id:
        '830010641453-76v4kgstnkkb23b5dkamvdhnia6tjmhp.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this)
    });

    google.accounts.id.renderButton(document.getElementById('btnGoogle'), {
      theme: 'dark',
      size: 'large',
      width: '100%',
    });
    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    if (response.credential) {
      sessionStorage.setItem('token', response.credential);

      let base64Url = response.credential.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      let data = JSON.parse(jsonPayload);


      this.users.value.nombres = data.given_name;
      this.users.value.email = data.email;
      this.users.value.clave = this.encriptar(data.given_name);
      let user = this.users.value;
      delete user.contrasena2;

      this.formularioLogin.value.usuario = data.email;
      this.formularioLogin.value.clave = data.given_name;

      this.user.login(this.formularioLogin.value).subscribe({
        next: (res) => {

          if (res.status === true) {
            this.layoutService.userData.next(res.id);
            localStorage.setItem('id', res.id);
            localStorage.setItem('nombres', data.name);
            localStorage.setItem('avatar', (data.picture ?? ''))
            this._ngZone.run(() => {
              this.router.navigate([`/resume/questions`]);
          });


            return;
          } else {
            this.user.userRegister(user).subscribe({
              next: (res) => {
                localStorage.setItem('nombres', data.name)
                localStorage.setItem('avatar', (data.picture ?? ''))
                this.layoutService.userData.next(res.id);
                localStorage.setItem('id', res.id);
                this._ngZone.run(() => {
                  this.router.navigate([`/resume/questions`]);
              });

                return;
              },
              error(err) {},
            });
          }

          this.formularioLogin.reset();
        },
        error(err) {},
      });
    }
  }

  loadForm() {
    this.users = this.formBuilder.group(
      {
        nombres: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        clave: new FormControl('', [Validators.required]),
        contrasena2: new FormControl('', [Validators.required]),
      },
      {
        validators: validarClaves,
      }
    );

    this.formularioLogin = this.formBuilder.group({
      usuario: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', Validators.required),
    });
  }

  validarIguales(): boolean {
    return this.users.valid;
  }

  encriptar(password: string) {
    return CryptoJS.AES.encrypt(password, environment.password).toString();
    //this.conversionDecryptOutput = CryptoJS.AES.decrypt(password, environment.password).toString(CryptoJS.enc.Utf8);
  }

  guardar() {
    this.submited = true;
    try {
      if (!this.users.valid) {
        return;
      }

      this.users.value.clave
        ? (this.users.value.clave = this.encriptar(this.users.value.clave))
        : '';
      let user = this.users.value;
      delete user.contrasena2;

      this.user.userRegister(user).subscribe({
        next: (res) => {
          this.active = !this.active;
          this.users.reset();
          return;
        },
        error(err) {},
      });
    } catch (error) {}
  }

  activeLogin() {
    this.active = !this.active;
  }

  registro() {
    this.active = !this.active;
  }

  ingresar() {
    try {
      this.submitedLogin = true;

      if (!this.formularioLogin.valid) {
        return;
      }
      this.user.login(this.formularioLogin.value).subscribe({
        next: (res) => {
          if (res.status === true) {
            const apellidos =  res.user?.apellidos;
            localStorage.setItem('nombres', res.user?.nombres + ' ' + (apellidos ??''));
            localStorage.setItem('avatar', (res.user?.foto ?? ''))
            this.layoutService.userData.next(res.id);
            localStorage.setItem('id', res.id);
            this.router.navigate([`/resume/questions`]);
            return;
          }

          this.formularioLogin.reset();
        },
        error(err) {},
      });
    } catch (error) {}
  }

  invitado() {
    localStorage.setItem('invitado', 'true');
    this.router.navigate([`/resume/questions`]);
  }
}
