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
  ) { 
    
  }

  ngOnInit(): void {
    this.setIdDeposito();
  }

  async setIdDeposito(){
    this.idDepositoSeleccionado = await this.supabaseService.getDepositoPrincipal();
  }

}
