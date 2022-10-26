import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./pages/global-components/navbar/navbar.component";
import { PrimengImportsModule } from "./primeng-imports/primeng-imports.module";
import { SidebarComponent } from "./pages/global-components/sidebar/sidebar.component";
import { ArticuloPageComponent } from "./pages/articulo-page/articulo-page.component";
import { DepositosPageComponent } from "./pages/depositos-page/depositos-page.component";
import { DepositoSeleccionadoPageComponent } from "./pages/deposito-seleccionado-page/deposito-seleccionado-page.component";
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpClientModule } from "@angular/common/http";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { UsuariosPageComponent } from "./pages/usuarios-page/usuarios-page.component";
import { DialogComponent } from "./pages/depositos-page/componentes/dialog/dialog.component";
import { AltaModificacionComponent } from "./pages/depositos-page/componentes/alta-modificacion/alta-modificacion.component";
import { FarmaciaPageComponent } from "./pages/farmacia-page/farmacia-page.component";
import { TablaComponent } from "./pages/deposito-seleccionado-page/componentes/tabla/tabla.component";
import { CategoriasUnidadesPageComponent } from "./pages/categorias-unidades-page/categorias-unidades-page.component";
import { CategoriasComponent } from "./pages/categorias-unidades-page/componentes/categorias/categorias.component";
import { CategoriasDialogComponent } from "./pages/categorias-unidades-page/componentes/categorias-dialog/categorias-dialog.component";
import { UnidadesComponent } from "./pages/categorias-unidades-page/componentes/unidades/unidades.component";
import { UnidadesDialogComponent } from "./pages/categorias-unidades-page/componentes/unidades-dialog/unidades-dialog.component";
import { AxdDialogComponent } from "./pages/deposito-seleccionado-page/componentes/axd-dialog/axd-dialog.component";
import { InicioPageComponent } from "./pages/inicio-page/inicio-page.component";
import { PlantasSectoresPageComponent } from "./pages/plantas-sectores-page/plantas-sectores-page.component";
import { PlantaABMComponent } from "./pages/plantas-sectores-page/components/planta-abm/planta-abm.component";
import { SectorABMComponent } from "./pages/plantas-sectores-page/components/sector-abm/sector-abm.component";
import { DialogPlantaComponent } from "./pages/plantas-sectores-page/components/planta-abm/components/dialog-planta/dialog-planta.component";
import { DialogSectorComponent } from "./pages/plantas-sectores-page/components/sector-abm/components/dialog-sector/dialog-sector.component";
import { MovimientosPageComponent } from "./pages/movimientos-page/movimientos-page.component";
import { MovimientoABMComponent } from "./pages/movimientos-page/components/movimiento-abm/movimiento-abm.component";
import { DetalleDialogComponent } from "./pages/movimientos-page/components/detalle-dialog/detalle-dialog.component";
import { DetalleABMComponent } from "./pages/movimientos-page/components/detalle-abm/detalle-abm.component";
import { DepositoFarmaciaPageComponent } from "./pages/deposito-farmacia-page/deposito-farmacia-page.component";
import { BotonComponent } from "./pages/farmacia-page/componentes/boton/boton.component";
import { NombreDepositoPipe } from "./pipes/nombre-deposito.pipe";
import { ProveedorPageComponent } from "./pages/proveedor-page/proveedor-page.component";
import { ProveedorABMComponent } from "./pages/proveedor-page/components/proveedor-abm/proveedor-abm.component";
import { ProveedorDialogComponent } from "./pages/proveedor-page/components/proveedor-dialog/proveedor-dialog.component";
import { DialogService } from "primeng/dynamicdialog";
import { ComprobanteABMComponent } from './pages/global-components/comprobante-abm/comprobante-abm.component';
import { FacturaPageComponent } from './pages/factura-page/factura-page.component';
import { OrdenCompraPageComponent } from './pages/orden-compra-page/orden-compra-page.component';
import { RemitoPageComponent } from './pages/remito-page/remito-page.component';
import { ComprobanteDialogComponent } from './pages/global-components/comprobante-abm/components/comprobante-dialog/comprobante-dialog.component';
import { SeleccionarArticulosComponent } from './pages/global-components/comprobante-abm/components/seleccionar-articulos/seleccionar-articulos.component';
import { SetearArticulosComponent } from './pages/global-components/comprobante-abm/components/setear-articulos/setear-articulos.component';
import { DetalleComprobanteComponent } from './pages/global-components/comprobante-abm/components/detalle-comprobante/detalle-comprobante.component';
import { ArticuloComprobanteABMComponent } from './pages/global-components/comprobante-abm/components/detalle-comprobante/components/articulo-comprobante-abm/articulo-comprobante-abm.component';
import { SeleccionarProveedorComponent } from './pages/global-components/comprobante-abm/components/seleccionar-proveedor/seleccionar-proveedor.component';
import { NuevoMovimientoComponent } from './pages/deposito-seleccionado-page/componentes/nuevo-movimiento/nuevo-movimiento.component';
import { SeleccionarDepositoComponent } from './pages/deposito-seleccionado-page/componentes/seleccionar-deposito/seleccionar-deposito.component';
import { PagoComprobantePageComponent } from './pages/pago-comprobante-page/pago-comprobante-page.component';
import { PagoABMComponent } from './pages/pago-comprobante-page/components/pago-abm/pago-abm.component';
import { PagoDetalleDialogComponent } from './pages/pago-comprobante-page/components/pago-detalle-dialog/pago-detalle-dialog.component';
import { PagoComprobanteABMComponent } from './pages/pago-comprobante-page/components/pago-comprobante-abm/pago-comprobante-abm.component';
import { PagoNuevoDialogComponent } from './pages/pago-comprobante-page/components/pago-nuevo-dialog/pago-nuevo-dialog.component';
import { PagoComprobantesASeleccionarABMComponent } from './pages/pago-comprobante-page/components/pago-comprobantes-aseleccionar-abm/pago-comprobantes-aseleccionar-abm.component';
import { ClientesPageComponent } from './pages/clientes-page/clientes-page.component';
import { ClienteABMComponent } from './pages/clientes-page/components/cliente-abm/cliente-abm.component';
import { ClienteDetalleDialogComponent } from './pages/clientes-page/components/cliente-detalle-dialog/cliente-detalle-dialog.component';
import { ClienteDetalleTabViewComponent } from './pages/clientes-page/components/cliente-detalle-dialog/cliente-detalle-tab-view/cliente-detalle-tab-view.component';
import { ClienteNuevoDialogComponent } from './pages/clientes-page/components/cliente-nuevo-dialog/cliente-nuevo-dialog.component';
import { PedidosPageComponent } from './pages/pedidos-page/pedidos-page.component';
import { UiButtonVolverComponent } from './pages/global-components/ui-button-volver/ui-button-volver.component';
import { MovimientosDepositoComponent } from './pages/deposito-seleccionado-page/componentes/movimientos-deposito/movimientos-deposito.component';
import { SeleccionarClienteComponent } from './pages/global-components/comprobante-abm/components/seleccionar-cliente/seleccionar-cliente.component';
import { MedicoPageComponent } from './pages/medico-page/medico-page.component';
import { MedicoABMComponent } from './pages/medico-page/components/medico-abm/medico-abm.component';
import { MedicoDetalleDialogComponent } from './pages/medico-page/components/medico-detalle-dialog/medico-detalle-dialog.component';
import { MedicoAltaDialogComponent } from './pages/medico-page/components/medico-alta-dialog/medico-alta-dialog.component';
import { PrestacionesPageComponent } from './pages/prestaciones-page/prestaciones-page.component';
import { PrestacionesDialogComponent } from './pages/prestaciones-page/componentes/prestaciones-dialog/prestaciones-dialog.component';
import { StoreModule } from '@ngrx/store';
import { PacientePageComponent } from './pages/paciente-page/paciente-page.component';
import { PacientesABMComponent } from './pages/paciente-page/components/pacientes-abm/pacientes-abm.component';
import { PacienteDetalleDialogComponent } from './pages/paciente-page/components/paciente-detalle-dialog/paciente-detalle-dialog.component';
import { PacienteAltaDialogComponent } from './pages/paciente-page/components/paciente-alta-dialog/paciente-alta-dialog.component';
import { ObraSocialPageComponent } from './pages/obra-social-page/obra-social-page.component';
import { ObraSocialABMComponent } from './pages/obra-social-page/components/obra-social-abm/obra-social-abm.component';
import { ObraSocialAltaDialogComponent } from './pages/obra-social-page/components/obra-social-alta-dialog/obra-social-alta-dialog.component';
import { ObraSocialASeleccionarComponent } from './pages/paciente-page/components/obra-social-aseleccionar/obra-social-aseleccionar.component';

import { AtencionesPageComponent } from './pages/atenciones-page/atenciones-page.component';
import { AtencionDialogComponent } from './pages/atenciones-page/componentes/atencion-dialog/atencion-dialog.component';
import { CalendarComponent } from './pages/global-components/forms/calendar/calendar.component';
import { FormDropdownComponent } from './pages/global-components/forms/form-dropdown/form-dropdown.component';
import { SeleccionarMedicoComponent } from "./pages/atenciones-page/componentes/seleccionar-medico/seleccionar-medico.component";
import { FormSeleccionadorComponent } from './pages/global-components/forms/form-seleccionador/form-seleccionador.component';
import { SeleccionarPacienteComponent } from './pages/atenciones-page/componentes/seleccionar-paciente/seleccionar-paciente.component';
import { FormTextareaComponent } from './pages/global-components/forms/form-textarea/form-textarea.component';
import { ArticulosSeleccionadosComponent } from './pages/atenciones-page/componentes/articulos-seleccionados/articulos-seleccionados.component';
import { PrestacionesSeleccionadasComponent } from './pages/atenciones-page/componentes/prestaciones-seleccionadas/prestaciones-seleccionadas.component';
import { SeleccionarPrestacionComponent } from "./pages/atenciones-page/componentes/seleccionar-prestacion/seleccionar-prestacion.component";
import { AtencionDetalleDialogComponent } from './pages/atenciones-page/componentes/atencion-detalle-dialog/atencion-detalle-dialog.component';

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
    DetalleABMComponent,
    CategoriasUnidadesPageComponent,
    CategoriasComponent,
    CategoriasDialogComponent,
    UnidadesComponent,
    UnidadesDialogComponent,
    AxdDialogComponent,
    InicioPageComponent,
    DepositoFarmaciaPageComponent,
    BotonComponent,
    NombreDepositoPipe,
    ProveedorPageComponent,
    ProveedorABMComponent,
    ProveedorDialogComponent,
    ComprobanteABMComponent,
    FacturaPageComponent,
    OrdenCompraPageComponent,
    RemitoPageComponent,
    ComprobanteDialogComponent,
    SeleccionarArticulosComponent,
    SetearArticulosComponent,
    DetalleComprobanteComponent,
    ArticuloComprobanteABMComponent, 
    PagoComprobantePageComponent, PagoABMComponent, PagoDetalleDialogComponent,
    ArticuloComprobanteABMComponent,
    SeleccionarProveedorComponent,
    NuevoMovimientoComponent,
    SeleccionarDepositoComponent,
    PagoComprobanteABMComponent,
    PagoNuevoDialogComponent,
    PagoComprobantesASeleccionarABMComponent,
    ClientesPageComponent,
    ClienteABMComponent,
    ClienteDetalleDialogComponent,
    ClienteDetalleTabViewComponent,
    ClienteNuevoDialogComponent,
    PedidosPageComponent,
    UiButtonVolverComponent,
    MovimientosDepositoComponent,
    SeleccionarClienteComponent,
    MedicoPageComponent,
    MedicoABMComponent,
    MedicoDetalleDialogComponent,
    MedicoAltaDialogComponent,
    PrestacionesPageComponent,
    PrestacionesDialogComponent,
    PacientePageComponent,
    PacientesABMComponent,
    PacienteDetalleDialogComponent,
    PacienteAltaDialogComponent,
    ObraSocialPageComponent,
    ObraSocialABMComponent,
    ObraSocialAltaDialogComponent,
    ObraSocialASeleccionarComponent,
    AtencionesPageComponent,
    AtencionDialogComponent,
    CalendarComponent,
    FormDropdownComponent,
    SeleccionarMedicoComponent,
    FormSeleccionadorComponent,
    SeleccionarPacienteComponent,
    FormTextareaComponent,
    ArticulosSeleccionadosComponent,
    PrestacionesSeleccionadasComponent,
    SeleccionarPrestacionComponent,
    AtencionDetalleDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PrimengImportsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [MessageService, ConfirmationService,DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
