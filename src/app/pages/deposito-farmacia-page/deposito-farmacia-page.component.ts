import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Articulo } from 'src/app/models/articulo';
import { SupabaseDepositoSeleccionadoService } from 'src/app/services/deposito-seleccionado/supabase-deposito-seleccionado.service';

@Component({
  selector: 'app-deposito-farmacia-page',
  templateUrl: './deposito-farmacia-page.component.html',
  styleUrls: ['./deposito-farmacia-page.component.css']
})
export class DepositoFarmaciaPageComponent implements OnInit {

  articulo!: Articulo;
  articulos: Articulo[] = [];
  articulosSeleccionados: Articulo[] = [];

  cantTotalArticulos!: number;
  idDepositoSeleccionado!: number;

  cargando!: boolean;
  dialog!: boolean;
  

  constructor(
    private supabaseService: SupabaseDepositoSeleccionadoService
  ) { }

  ngOnInit(): void {
    this.setIdDepositoFarmacia();
  }

  async setIdDepositoFarmacia(){
    
  }

  async onLazyLoad(event: LazyLoadEvent){
    this.cargando = true;
    this.articulos = [];

    this.idDepositoSeleccionado = await this.supabaseService.getDepositoPrincipal();
    console.log(this.idDepositoSeleccionado); 
    

    let request = await this.supabaseService.readArticulosView(this.idDepositoSeleccionado, event);

    this.cantTotalArticulos = await this.supabaseService.getCantArticulos(this.idDepositoSeleccionado);

    if(request.data){
      request.data.forEach(
        (element) => {
          this.articulos.push(Articulo.fromArticulosDepositoView(element));
        }
      );

      // console.log(request.data);
    }else{
      console.log(request.error);
    }

    this.cargando = false;
  }

  transferirArticulo(articulo: Articulo){

  }

  transferenciaRealizada(event: boolean){

  }

}
