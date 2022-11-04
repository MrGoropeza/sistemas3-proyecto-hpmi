import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  paginas!: MenuItem[];

  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paginas = this.navigationService.sidebarItems;

    // esto es un intento de rellenar automaticamente el sidebar sin hardcodearlo en el navigation.service
    // console.log("Items", this.navigationService.getSidebarItems(this.router.config));
    
    // this.paginas = this.navigationService.getSidebarItems(this.router.config)
  }

}
