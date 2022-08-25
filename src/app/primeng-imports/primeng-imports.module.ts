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
import {RippleModule} from 'primeng/ripple';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import {BadgeModule} from 'primeng/badge';


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
    ToastModule,
    FileUploadModule,
    TableModule,
    RippleModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    BadgeModule,
  ]
})
export class PrimengImportsModule { }
