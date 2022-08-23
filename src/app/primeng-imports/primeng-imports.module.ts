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
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RippleModule} from 'primeng/ripple';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    InputTextModule,
    ToolbarModule,
    SlideMenuModule,
    ButtonModule,
    ImageModule,
    ToggleButtonModule,
    SidebarModule,
    BreadcrumbModule,
    DataViewModule,
    ToastModule,
    FileUploadModule,
    TableModule,
    RippleModule
  ]
})
export class PrimengImportsModule { }
