import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticuloDeposito } from 'src/app/models/IArticuloDeposito';
import { ArticuloDeDepositoService } from 'src/app/services/deposito/articulo-de-deposito.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  articulos: IArticuloDeposito[] = [];
  indice! : number;
  constructor(private servicioArticulos : ArticuloDeDepositoService,
    private router : Router,
    private arouter : ActivatedRoute) { }

  ngOnInit(): void {
    this.indice = this.arouter.snapshot.params['id'];
    this.obtenerArticulos(this.indice);
  }
  public obtenerArticulos(id: number){
    this.servicioArticulos.getArticulos(id).then(
      (articulos)=>{
        if(articulos.data != null){
          this.articulos = articulos.data;
          console.log(this.articulos[0]);
          // console.log(this.articulos[0].unidad.id);
          
        }
      }
    );
  }
  public volver(){
    this.router.navigate(['farmacia/abmDepositos']);
  }
}
