import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArticuloPageComponent } from './pages/articulo-page/articulo-page.component';
import { DepositosPageComponent } from './pages/depositos-page/depositos-page.component';
import { UsuariosPageComponent } from './pages/usuarios-page/usuarios-page.component';

// const routes2: Routes = [
//   {path: 'abmDepositos', component: DepositosPageComponent},
//   {path: 'abmArticulos', component: ArticuloPageComponent},
//   {path: 'abmUsuarios', component: UsuariosPageComponent}
// ];

const routes: Routes = [
  {
    path: "", 
    data: {
      breadcrumb: "Inicio"
    },
    children: [
      {
        path: "farmacia",
        data: {
          breadcrumb: "Farmacia"
        },
        children: [
          {
            path: "abmDepositos",
            data: {
              breadcrumb: "Depósitos"
            },
            component: DepositosPageComponent
          },
          {
            path: "abmArticulos",
            data: {
              breadcrumb: "Artículos"
            },
            component: ArticuloPageComponent
          },
        ]
      },
      {
        path: "usuarios",
        data: {
          breadcrumb: "Usuarios"
        },
        children: [
          {
            path: "abm",
            data: {
              breadcrumb: "Altas, Bajas y Modificaciones"
            },
            component: UsuariosPageComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
