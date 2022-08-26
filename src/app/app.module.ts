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
import { FarmaciaPageComponent } from './pages/farmacia-page/farmacia-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ArticuloPageComponent,
    DepositosPageComponent,
    DepositoSeleccionadoPageComponent,
    LoginPageComponent,
    UsuariosPageComponent,
    FarmaciaPageComponent
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
