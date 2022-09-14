import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class NavigationService{

    sidebarItems : MenuItem[] = [
      {
        label: "Inicio",
        icon: 'bi bi-house',
        routerLink: "/"
      },
      {
        label: "Farmacia",
        items:[
          {
            label: 'Inicio Farmacia',
            icon: 'bi bi-house',
            routerLink: '/farmacia'
          },
          { 
            label: 'Depósitos',
            icon: 'bi bi-box-seam',
            items: [
              {
                label: 'Depósito de Farmacia',
                routerLink: "/farmacia/depositoFarmacia",
              },
              {
                label: 'Depósitos del Hospital',
                routerLink: "/farmacia/abmDepositos",
              },
              {
                label: 'ABM Sectores/Plantas',
                routerLink: "/farmacia/abmDepositos/platasSectores"
              },
            ],
          },
          {
            label: 'Artículos',
            icon: "bi bi-boxes",
            items: [
              {
                label: 'Altas, Bajas y Modificaciones',
                routerLink: "/farmacia/abmArticulos",
              },
              {
                label: 'ABM Categorías/Unidades',
                routerLink: "/farmacia/abmArticulos/categoriasUnidades"
              }
            ],
          },
          {
            label: 'Movimientos',
            icon: 'pi pi-sort-alt',
            routerLink: "/farmacia/abmMovimientos"
          },
          {
            label: 'Proveedores',
            icon: 'bi bi-person-rolodex',
            routerLink: "/farmacia/proveedores"
          }
        ]
      },
      // {
      //   label: "Usuarios",
      //   items: [
      //     {
      //       label: "ABM",
      //       icon: "pi pi-users",
      //       routerLink: "usuarios/abm"
      //     }
      //   ]
      // },    
    ];

    constructor() {}

    getSidebarItems(): MenuItem[] {
        return this.sidebarItems;
    }

    createBreadcrumbs(
      actualroute: ActivatedRoute,
      route: ActivatedRoute, 
      url: string = '', 
      breadcrumbs: MenuItem[] = [],
    ): MenuItem[] {
        const children: ActivatedRoute[] = route.children;
  
      if (children.length === 0) {
         return breadcrumbs;
      }
  
      for (const child of children) {
         const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
         url += `/${routeURL}`;
         
         let label = child.snapshot.data["breadcrumb"];

         if(child.snapshot.params["id"]){
          label += " " + child.snapshot.params["id"];
         }

         
         if(!(label === null || label === undefined) && label !== '') {
            if(label !== actualroute.snapshot.data["breadcrumb"]){
              breadcrumbs.push({label, routerLink: url, target: "_self"});
              // console.log(`label: ${label}, routerLink: ${url}`);
            }
            
         }
         
         return this.createBreadcrumbs(actualroute, child, url, breadcrumbs);
      }

      return breadcrumbs;
    }
}

