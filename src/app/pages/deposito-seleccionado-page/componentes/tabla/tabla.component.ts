import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Articulo } from 'src/app/models/articulo';
import { SupabaseDepositoSeleccionadoService } from 'src/app/services/deposito-seleccionado/supabase-deposito-seleccionado.service';
import { ArticuloDeDepositoService } from 'src/app/services/deposito/articulo-de-deposito.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  articulo!: Articulo;
  articulos: Articulo[] = [];
  articulosSeleccionados: Articulo[] = [];

  cantTotalArticulos!: number;

  dialog: boolean = false;
  cargando: boolean = false;

  idDepositoSeleccionado! : number;
  
  constructor(
    private servicioArticulos : ArticuloDeDepositoService,
    private supabaseService : SupabaseDepositoSeleccionadoService,
    private router : Router,
    private arouter : ActivatedRoute,
    private messageService : MessageService) { }

  ngOnInit(): void {
    this.idDepositoSeleccionado = this.arouter.snapshot.params['id'];
  }

  async onLazyLoad(event: LazyLoadEvent){

    this.cargando = true;
    this.articulos = [];

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

  transferirSeleccion(){
    this.dialog = true;
  }

  transferirArticulo(articulo: Articulo){
    this.articulo = articulo;
    this.dialog = true;
  }

  transferenciaRealizada(event: boolean){
    if(event){
      this.messageService.add(
        {severity:'success', 
        summary: 'Éxito',
        detail: 'Transferencia Realizada',
        life: 3000}
      );
    }
  }
}
