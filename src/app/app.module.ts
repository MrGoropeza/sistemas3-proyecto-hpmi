import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbmTestComponent } from './pages/abm-test/abm-test.component';
import { NavbarComponent } from './pages/components/navbar/navbar.component';
import { PrimengImportsModule } from './primeng-imports/primeng-imports.module';

@NgModule({
  declarations: [
    AppComponent,
    AbmTestComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimengImportsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
