import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreDeposito'
})
export class NombreDepositoPipe implements PipeTransform {

  transform(id : number): string {
    return "Deposito " + id;
  }

}
