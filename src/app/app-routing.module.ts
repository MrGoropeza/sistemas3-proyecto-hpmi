import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArticuloPageComponent } from './pages/articulo-page/articulo-page.component';
import { CategoriasUnidadesPageComponent } from './pages/categorias-unidades-page/categorias-unidades-page.component';
import { DepositoSeleccionadoPageComponent } from './pages/deposito-seleccionado-page/deposito-seleccionado-page.component';
import { DepositosPageComponent } from './pages/depositos-page/depositos-page.component';
import { FarmaciaPageComponent } from './pages/farmacia-page/farmacia-page.component';
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
    title: "Inicio",
    children: [
      {
        path: "farmacia",
        data: {
          breadcrumb: "Farmacia"
        },
        children: [
          {
            // este es el path de /farmacia
            path: "",
            pathMatch: "full",
            data:{
              breadcrumb: ""
            },
            component: FarmaciaPageComponent,
            title: "Farmacia"
          },
          {
            path: "abmDepositos",
            data: {
              breadcrumb: "Depósitos"
            },
            children:[
              {
                // este es el path de /farmacia/abmDepositos
                path:"",
                data: {breadcrumb: ""},
                component: DepositosPageComponent, 
                pathMatch: "full",
                title: "Depósitos",
              },
              {
                path: "depositoSeleccionado/:id",
                data: {
                  breadcrumb: "Artículos en Deposito"
                },
                component : DepositoSeleccionadoPageComponent
              }
            ]
          },
          {
            path: "abmArticulos",
            data: {
              breadcrumb: "Artículos"
            },
            children: [
              {
                // este es el path de /farmacia/abmArticulos
                path: "",
                pathMatch: "full",
                data: {breadcrumb: ""},
                component: ArticuloPageComponent,
                title: "Artículos"
              },
              {
                // este es el path de /farmacia/abmArticulos/categoriasUnidades
                path: "categoriasUnidades",
                data: {breadcrumb: "Categorías y Unidades"},
                component: CategoriasUnidadesPageComponent
              }
            ],
            
          },
        ]
      },
      {
        path: "usuarios",
        data: {
          breadcrumb: "Usuarios"
        },
        title: "Usuarios",
        children: [
          {
            path: "abm",
            data: {
              breadcrumb: "Altas, Bajas y Modificaciones"
            },
            component: UsuariosPageComponent,
            title: "ABM Usuarios"
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "ignore"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
