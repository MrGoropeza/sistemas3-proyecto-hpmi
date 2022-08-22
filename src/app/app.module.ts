import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/global-components/navbar/navbar.component';
import { PrimengImportsModule } from './primeng-imports/primeng-imports.module';
import { SidebarComponent } from './pages/global-components/sidebar/sidebar.component';
import { ArticuloPageComponent } from './pages/articulo-page/articulo-page.component';
import { DepositosPageComponent } from './pages/depositos-page/depositos-page.component';
import { DepositoSeleccionadoPageComponent } from './pages/deposito-seleccionado-page/deposito-seleccionado-page.component';
import { AltaComponent } from './pages/depositos-page/componentes/alta/alta.component';
import { BajaComponent } from './pages/depositos-page/componentes/baja/baja.component';
import { ModificacionComponent } from './pages/depositos-page/componentes/modificacion/modificacion.component';
import { TarjetaComponent } from './pages/depositos-page/componentes/tarjetaHorizontal/tarjeta.component';
import { TarjetaVerticalComponent } from './pages/depositos-page/componentes/tarjeta-vertical/tarjeta-vertical.component';
import { DialogComponent } from './pages/depositos-page/componentes/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ArticuloPageComponent,
    DepositosPageComponent,
    DepositoSeleccionadoPageComponent,
    AltaComponent,
    BajaComponent,
    ModificacionComponent,
    TarjetaComponent,
    TarjetaVerticalComponent,
    DialogComponent
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
