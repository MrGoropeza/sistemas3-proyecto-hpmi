import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CategoriasUnidadesPageComponent } from './pages/categorias-unidades-page/categorias-unidades-page.component';
import { CategoriasComponent } from "./pages/categorias-unidades-page/componentes/categorias/categorias.component";
import { CategoriasDialogComponent } from './pages/categorias-unidades-page/componentes/categorias-dialog/categorias-dialog.component';
import { UnidadesComponent } from './pages/categorias-unidades-page/componentes/unidades/unidades.component';
import { UnidadesDialogComponent } from './pages/categorias-unidades-page/componentes/unidades-dialog/unidades-dialog.component';
import { AxdDialogComponent } from './pages/deposito-seleccionado-page/componentes/axd-dialog/axd-dialog.component';

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
    CategoriasUnidadesPageComponent,
    CategoriasComponent,
    CategoriasDialogComponent,
    UnidadesComponent,
    UnidadesDialogComponent,
    AxdDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PrimengImportsModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
