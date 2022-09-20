import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreDeposito',
  pure: true
})
export class NombreDepositoPipe implements PipeTransform {

  transform(id : number): string {
    console.log("holaa");
    
    return "Deposito " + id.toString();
  }

}
