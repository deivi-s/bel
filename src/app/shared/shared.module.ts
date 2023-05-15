import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ContainerComponent],
  imports: [
    CommonModule,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule
  ],
   exports: [
    ContainerComponent,
    MatToolbarModule,
    MatSidenavModule,
    ContainerComponent,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatChipsModule
   ]
})
export class SharedModule { }
