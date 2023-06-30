import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/config/services/layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  active = true;
  constructor(
    private layoutService: LayoutService,
    private readonly router: Router,
    private formBuilder: FormBuilder,
    private userService: LayoutService
  ) {
    this.layoutService.configuration = { header: false, menu: false };

  }

  ngOnInit(): void {
  }

  activeLogin(){
    this.active = !this.active;
  }

  registro(){
    this.active = !this.active;
  }

  login(){
    this.router.navigate([`/recommendation/resume`]);
  }
}
