import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from 'src/app/config/services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onToggleSidenav: EventEmitter<void> = new EventEmitter<void>();
  nombres: string;
  avatar: string;
  constructor( private layoutService: LayoutService, private readonly router: Router) {}

  ngOnInit(): void {
      this.nombres = localStorage.getItem('nombres') || 'Iniciar Sesión';
      this.avatar = localStorage.getItem('avatar') || 'assets/icon-menu/avatar.svg';
  }

  toggleSidenav(): void {
    this.onToggleSidenav.emit();
  }

  logout(): void {
    localStorage.removeItem('nombres');
    localStorage.removeItem('id');
    localStorage.removeItem('invitado');
    localStorage.removeItem('avatar');
    /*
    localStorage.setItem('invitado', 'false');

    this.layoutService.configuration = { header: false, menu: false };
    this.router.navigate(['/']); */

  }

}
