import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToolbarModule} from 'primeng/toolbar';
import {SlideMenuModule} from 'primeng/slidemenu';
import {ButtonModule} from 'primeng/button';
import {ImageModule} from 'primeng/image';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ToolbarModule,
    SlideMenuModule,
    ButtonModule,
    ImageModule
  ]
})
export class PrimengImportsModule { }
