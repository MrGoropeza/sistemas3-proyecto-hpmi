import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   breadcrumbItems!: MenuItem[];

   darkMode! : boolean;

   sidebarVisible : boolean = false;

   constructor(
      private themeService: ThemeService,
      private navigationServices: NavigationService,
      private router: Router,
      private activatedRoute: ActivatedRoute
   ) {
      this.darkMode = themeService.darkMode;
   }

   ngOnInit(): void {
      // this.router.events
      //    .pipe(filter(event => event instanceof NavigationEnd))
      //    .subscribe(() => this.breadcrumbItems = this.createBreadcrumbs(this.activatedRoute.root));

      this.router.events
         .pipe(filter(event => event instanceof NavigationEnd))
         .subscribe(() => 
            this.breadcrumbItems = this.navigationServices
                     .createBreadcrumbs(this.activatedRoute, this.activatedRoute.root)
         );
   }

   cambiarTema(){
      this.themeService.switchTheme();
      this.darkMode = this.themeService.darkMode;
   }
}
