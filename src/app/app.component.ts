import { Component } from '@angular/core';

import { ILayout } from './config/interfaces/layout.interface';
import { LayoutService } from './config/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'bel';
  isLoading = false;

  configLayout !: ILayout;
  isMenuShow: boolean = true;

  constructor(private layoutService: LayoutService) {
    layoutService.configuration.subscribe((config: ILayout) => {
      this.configLayout = config;
    });

  }

  toggleMenu(): void {
    this.isMenuShow = !this.isMenuShow;
  }

}
