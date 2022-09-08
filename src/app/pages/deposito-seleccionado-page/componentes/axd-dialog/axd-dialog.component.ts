import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Articulo } from 'src/app/models/articulo';
import { CategoriaArticulo } from 'src/app/models/categoriaArticulo';
import { Deposito } from 'src/app/models/Deposito';
import { SupabaseDepositoSeleccionadoService } from 'src/app/services/deposito-seleccionado/supabase-deposito-seleccionado.service';

@Component({
  selector: 'app-axd-dialog',
  templateUrl: './axd-dialog.component.html',
  styleUrls: ['./axd-dialog.component.css']
})
export class AxdDialogComponent implements OnInit {

  @Input() dialog!: boolean;
  @Output() dialogChange = new EventEmitter<boolean>();

  @Input() articulo!: Articulo;
  @Input() articulosSeleccionados: Articulo[] = [];

  @Input() idDepositoSeleccionado!: number;
  destinos: Deposito[] = [];

  formTransferencia = this.formBuilder.group({
    destino: ["", Validators.required]
  });

  constructor(
    private supabaseService: SupabaseDepositoSeleccionadoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.onLazyLoad();
  }

  async onLazyLoad(event?: LazyLoadEvent){
    console.log("lazy load del dialog");
    console.log(event);

    if(this.idDepositoSeleccionado){
      let request = await this.supabaseService.getDepositosDestinos(this.idDepositoSeleccionado);
      if(request.data){
        request.data.map(
          (value, index) => {
            console.log(value);
            
            this.destinos.push(value);
          }
        )
        console.log(request.data);
      }else{
        console.log(request.error);
      }
    }
    
    
  }

  ocultarDialog(){
    this.dialog = false;
    this.dialogChange.emit(false);
    
  }

}
