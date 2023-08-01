import {
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';

import { LayoutService } from 'src/app/config/services/layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, DoCheck {

  resume = [];
  id: number = 0;
  constructor(private layoutService: LayoutService) { this.layoutService.configuration = { header: true, menu: true };  }

  ngOnInit(): void {
    this.id = this.layoutService.userData?.getValue() || localStorage.getItem('id') ||0;
  }

  ngDoCheck(){
    try {
      this.resume = JSON.parse(localStorage.getItem('market') || '');
    } catch (error) {
      this.resume = []
    }
  }



}
