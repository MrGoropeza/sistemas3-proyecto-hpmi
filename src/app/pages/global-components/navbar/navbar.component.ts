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

   static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';

   items!: MenuItem[];

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
      this.router.events
         .pipe(filter(event => event instanceof NavigationEnd))
         .subscribe(() => this.breadcrumbItems = this.createBreadcrumbs(this.activatedRoute.root));

   }

   private createBreadcrumbs(
      route: ActivatedRoute, 
      url: string = '', 
      breadcrumbs: MenuItem[] = []): MenuItem[] {
      const children: ActivatedRoute[] = route.children;
  
      if (children.length === 0) {
         return breadcrumbs;
      }
  
      for (const child of children) {
         const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
         if (routeURL !== '') {
            url += `/${routeURL}`;
         }
   
         const label = child.snapshot.data[NavbarComponent.ROUTE_DATA_BREADCRUMB];
         if(!(label === null || label === undefined)) {
            breadcrumbs.push({label, url, target: ""});
         }
         
         return this.createBreadcrumbs(child, url, breadcrumbs);
      }

      return breadcrumbs;
   }

   cambiarTema(){
      this.themeService.switchTheme();
      this.darkMode = this.themeService.darkMode;
   }
}
