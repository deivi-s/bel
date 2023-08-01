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

  constructor( private layoutService: LayoutService, private readonly router: Router) {}

  ngOnInit(): void {}

  toggleSidenav(): void {
    this.onToggleSidenav.emit();
  }

  logout(): void {/*
    localStorage.setItem('invitado', 'false');

    this.layoutService.configuration = { header: false, menu: false };
    this.router.navigate(['/']); */

  }

}
