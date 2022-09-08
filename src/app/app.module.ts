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
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UsuariosPageComponent } from './pages/usuarios-page/usuarios-page.component';
import { DialogComponent } from './pages/depositos-page/componentes/dialog/dialog.component';
import { AltaModificacionComponent } from './pages/depositos-page/componentes/alta-modificacion/alta-modificacion.component';
import { FarmaciaPageComponent } from './pages/farmacia-page/farmacia-page.component';
import { TablaComponent } from './pages/deposito-seleccionado-page/componentes/tabla/tabla.component';
import { PlantasSectoresPageComponent } from './pages/plantas-sectores-page/plantas-sectores-page.component';
import { PlantaABMComponent } from './pages/plantas-sectores-page/components/planta-abm/planta-abm.component';
import { SectorABMComponent } from './pages/plantas-sectores-page/components/sector-abm/sector-abm.component';
import { DialogPlantaComponent } from './pages/plantas-sectores-page/components/planta-abm/components/dialog-planta/dialog-planta.component';
import { DialogSectorComponent } from './pages/plantas-sectores-page/components/sector-abm/components/dialog-sector/dialog-sector.component';
import { MovimientosPageComponent } from './pages/movimientos-page/movimientos-page.component';
import { MovimientoABMComponent } from './pages/movimientos-page/components/movimiento-abm/movimiento-abm.component';
import { DetalleDialogComponent } from './pages/movimientos-page/components/detalle-dialog/detalle-dialog.component';
import { DetalleABMComponent } from './pages/movimientos-page/components/detalle-abm/detalle-abm.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ArticuloPageComponent,
    DepositosPageComponent,
    DepositoSeleccionadoPageComponent,
    DialogComponent,
    AltaModificacionComponent,
    LoginPageComponent,
    UsuariosPageComponent,
    FarmaciaPageComponent,
    TablaComponent,
    PlantasSectoresPageComponent,
    PlantaABMComponent,
    SectorABMComponent,
    DialogPlantaComponent,
    DialogSectorComponent,
    MovimientosPageComponent,
    MovimientoABMComponent,
    DetalleDialogComponent,
    DetalleABMComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PrimengImportsModule,
    FormsModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
