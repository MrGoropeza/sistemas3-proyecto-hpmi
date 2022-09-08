import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class NavigationService{

    sidebarItems : MenuItem[] = [
      {
        label: "Farmacia",
        items:[
          { 
            label: 'ABM Depósitos',
            icon: 'pi pi-fw pi-building',
            routerLink: "/farmacia/abmDepositos",
          },
          {
            label: 'ABM Artículos',
            icon: "pi pi-fw pi-box",
            routerLink: "/farmacia/abmArticulos",
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
         if (routeURL !== '') {
            url += `/${routeURL}`;
         }
         
         let label = child.snapshot.data["breadcrumb"];

         if(child.snapshot.params["id"]){
          label += " " + child.snapshot.params["id"];
         }

         
         if(!(label === null || label === undefined) && label !== '') {
            if(label !== actualroute.snapshot.data["breadcrumb"]){
              if(url === ""){
                url = "/";
              }
              breadcrumbs.push({label, routerLink: url, target: "_self"});
              console.log(`label: ${label}, routerLink: ${url}`);
            }
            
         }
         
         return this.createBreadcrumbs(actualroute, child, url, breadcrumbs);
      }

      return breadcrumbs;
    }
}

