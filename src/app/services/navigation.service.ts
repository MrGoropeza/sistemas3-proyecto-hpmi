import { Inject, Injectable } from '@angular/core';
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
        {
          label: "Usuarios",
          items: [
            {
              label: "ABM",
              icon: "pi pi-users",
              routerLink: "usuarios/abm"
            }
          ]
        },    
    ];

    constructor() {}

    getSidebarItems(): MenuItem[] {
        return this.sidebarItems;
    }
}

