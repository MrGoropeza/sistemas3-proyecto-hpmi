import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   items!: MenuItem[];
   darkMode! : boolean;

   sidebarVisible : boolean = false;

   constructor(private themeService: ThemeService) {
      this.darkMode = themeService.darkMode;
   }

   ngOnInit(): void {
      this.items = [
         {icon: "pi pi-home"},
         {label:'Farmacia',},
         {label:'Artículos'},
      ];
   }

   cambiarTema(){
      this.themeService.switchTheme();
      this.darkMode = this.themeService.darkMode;
   }
}
