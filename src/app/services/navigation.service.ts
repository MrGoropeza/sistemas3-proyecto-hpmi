import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class NavigationService{

    sidebarItems : MenuItem[] = [
      {
        label: "Hospital Materno Infantil",
        icon: 'bi bi-hospital',
        styleClass: "text-2xl",
        routerLink: "/"
      },
      {
        label: "Farmacia",
        icon: "bi bi-bandaid",
        expanded: true,
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
          // {
          //   label: 'Movimientos',
          //   icon: 'pi pi-sort-alt',
          //   routerLink: "/farmacia/abmMovimientos"
          // },
          {
            label: 'Proveedores',
            icon: 'bi bi-person-rolodex',
            routerLink: "/farmacia/proveedores"
          },
          // {
          //   label: 'Clientes',
          //   icon: 'bi bi-people-fill',
          //   routerLink: "/farmacia/clientes"
          // },
          {
            label: 'Facturas',
            icon: 'bi bi-receipt',
            routerLink: "/farmacia/facturas"
          },
          {
            label: 'Ordenes de Compra',
            icon: 'bi bi-cart',
            routerLink: "/farmacia/ordenesCompra"
          },
          // {
          //   label: 'Remitos',
          //   icon: 'bi bi-card-heading',
          //   routerLink: "/farmacia/remitos"
          // },
          {
            label : 'Pago',
            icon : 'bi bi-currency-dollar',
            routerLink : "/farmacia/pagoComprobantes"
          },
          // {
          //   label : 'Pedidos',
          //   icon : 'bi bi-bag-check',
          //   routerLink : "/farmacia/pedidos"
          // }
        ]
      },
      {
        label: "Medicos",
        icon: "bi bi-heart-pulse-fill",
        routerLink : "/medicos"
      },
      {
        label: "Pacientes",
        icon: "bi bi-journal-medical",
        routerLink : "/pacientes"
      },
      {
        label: "Obras Sociales",
        icon: "bi bi-building",
        routerLink : "/obrassociales"
      },
      {
        label: "Prestaciones",
        icon: 'bi bi-file-earmark-medical',
        routerLink: "/prestaciones"
      },
      {
        label: "Atenciones",
        icon: 'bi bi-bookmark-plus',
        routerLink: "/atenciones"
      },
      {
        label: "Facturación Obras Sociales",
        icon: 'bi bi-receipt-cutoff',
        routerLink: "/facturasObrasSociales"
      },
      {
        label: "Pagos Obras Sociales",
        icon: 'bi bi-cash',
        routerLink: "/pagosObrasSociales"
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
              breadcrumbs.push({label, routerLink: url});
              // console.log(`label: ${label}, routerLink: ${url}`);
            }
            
         }
         
         return this.createBreadcrumbs(actualroute, child, url, breadcrumbs);
      }

      return breadcrumbs;
    }

    printpath(parent: String, config: Route[]) {
      for (let i = 0; i < config.length; i++) {
        const route = config[i];
        console.log(parent + '/' + route.path);
        if (route.children) {
          const currentPath = route.path ? parent + '/' + route.path : parent;
          this.printpath(currentPath, route.children);
        }
      }
    }

    getSidebarItems(
      routes: Route[], 
      routerLink: string = '', 
      parent: MenuItem = {},
      items: MenuItem[] = [],
    ): MenuItem[]{
      
      if(routes.length === 0){return items}

      routes.forEach(route => {
        let item: MenuItem = {};

        if(route.data){
          item.label = route.data["breadcrumb"]

          if(route.pathMatch === "full"){parent.routerLink = routerLink + "/" + route.path}
          else{item.routerLink = routerLink + "/" + route.path;}
        }

        if(route.children){
          item.items = this.getSidebarItems(route.children, route.path, item)
        }
        
        if(route.pathMatch !== "full"){items.push(item);}
        
      });
      
      return items;
    }

}

