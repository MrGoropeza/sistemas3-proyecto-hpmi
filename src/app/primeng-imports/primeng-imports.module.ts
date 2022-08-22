import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToolbarModule} from 'primeng/toolbar';
import {SlideMenuModule} from 'primeng/slidemenu';
import {ButtonModule} from 'primeng/button';
import {ImageModule} from 'primeng/image';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SidebarModule} from 'primeng/sidebar';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {DataViewModule} from 'primeng/dataview';
import {CardModule} from 'primeng/card';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';

import {InputTextModule} from 'primeng/inputtext';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ToolbarModule,
    SlideMenuModule,
    ButtonModule,
    ImageModule,
    ToggleButtonModule,
    SidebarModule,
    BreadcrumbModule,
    DataViewModule,
    CardModule,
    TooltipModule,
    DialogModule,
    InputTextModule
  ]
})
export class PrimengImportsModule { }
