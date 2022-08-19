import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbmTestComponent } from './pages/abm-test/abm-test.component';
import { NavbarComponent } from './pages/components/navbar/navbar.component';
import { PrimengImportsModule } from './primeng-imports/primeng-imports.module';
import { SidebarComponent } from './pages/components/sidebar/sidebar.component';
import { ArticuloPageComponent } from './pages/articulo-page/articulo-page.component';
import { DepositosPageComponent } from './pages/depositos-page/depositos-page.component';
import { DepositoSeleccionadoPageComponent } from './pages/deposito-seleccionado-page/deposito-seleccionado-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AbmTestComponent,
    NavbarComponent,
    SidebarComponent,
    ArticuloPageComponent,
    DepositosPageComponent,
    DepositoSeleccionadoPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimengImportsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
