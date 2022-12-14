import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Articulo } from 'src/app/models/articulo';
import { Movimiento } from 'src/app/models/Movimiento';
import { SupabaseDepositoSeleccionadoService } from 'src/app/services/deposito-seleccionado/supabase-deposito-seleccionado.service';
import { ArticuloDeDepositoService } from 'src/app/services/deposito/articulo-de-deposito.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit{

  articulo!: Articulo;
  articulos: Articulo[] = [];
  articulosSeleccionados: Articulo[] = [];

  cantTotalArticulos!: number;

  dialog: boolean = false;
  cargando: boolean = false;

  @Input() idDepositoSeleccionado! : number;
  @Input() idHeredado! : boolean;

  dialogMovimientos: boolean = false;

  dialogDetalleMovimiento : boolean = false;
  tituloDetalleDialog: string = "";
  movimientoSeleccionado!: Movimiento;
  
  constructor(
    private servicioArticulos : ArticuloDeDepositoService,
    private supabaseService : SupabaseDepositoSeleccionadoService,
    private router : Router,
    private arouter : ActivatedRoute,
    private messageService : MessageService) { }

  ngOnInit(): void {
    if(!this.idHeredado){
      this.idDepositoSeleccionado = this.arouter.snapshot.params['id'];
    }
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

      console.log(request.data);
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
        summary: '??xito',
        detail: 'Transferencia Realizada',
        life: 3000}
      );
    }
  }

  async movimientoRealizado(event: boolean){
    if(event){
      await this.onLazyLoad({first: 0, rows: 10});
      this.messageService.add(
        {severity:'success', 
        summary: '??xito',
        detail: 'Movimiento Realizado',
        life: 3000}
      );
    }
  }

  verMovimientos(){
    this.dialogMovimientos = true;
  }

  verDetalleMovimientos(movimiento: Movimiento){
    this.movimientoSeleccionado = movimiento;
    this.dialogDetalleMovimiento = true;
    this.tituloDetalleDialog ="Movimiento #"+movimiento.idMovimiento.toString();
  }
}
