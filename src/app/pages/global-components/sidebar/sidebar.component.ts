import { Component, OnInit } from '@angular/core';
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
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.paginas = this.navigationService.getSidebarItems();
  }

}
