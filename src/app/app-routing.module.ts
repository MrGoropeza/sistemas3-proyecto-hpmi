import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositosPageComponent } from './pages/depositos-page/depositos-page.component';

const routes: Routes = [
  {path: 'abmDepositos', component: DepositosPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
