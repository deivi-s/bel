import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onToggleSidenav: EventEmitter<void> = new EventEmitter<void>();

  constructor( private readonly router: Router) {}

  ngOnInit(): void {}

  toggleSidenav(): void {
    this.onToggleSidenav.emit();
  }

  logout(): void {
    this.router.navigate([`/`]);
  }

}
