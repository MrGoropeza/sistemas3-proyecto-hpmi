import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
import { Articulo } from 'src/app/models/articulo';
import { CategoriaArticulo } from 'src/app/models/categoriaArticulo';
import { Deposito } from 'src/app/models/Deposito';
import { SupabaseDepositoSeleccionadoService } from 'src/app/services/deposito-seleccionado/supabase-deposito-seleccionado.service';

@Component({
  selector: 'app-axd-dialog',
  templateUrl: './axd-dialog.component.html',
  styleUrls: ['./axd-dialog.component.css']
})
export class AxdDialogComponent implements OnInit, OnChanges {


  @Input() dialog!: boolean;
  @Output() dialogChange = new EventEmitter<boolean>();

  @Input() articulo!: Articulo;

  @Input() idDepositoSeleccionado!: number;
  destinos: Deposito[] = [];

  @Output() creando = new EventEmitter<boolean>();

  formTransferencia = this.formBuilder.group({
    destino: [null, Validators.required],
    cantidad: [0, [Validators.required, Validators.min(1)]]
  });

  confirmado: boolean = false;

  constructor(
    private supabaseService: SupabaseDepositoSeleccionadoService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.onLazyLoad();
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.articulo){
      this.formTransferencia.controls["cantidad"].addValidators(Validators.max(this.articulo.stock));
    }
    
  }

  async onLazyLoad(event?: LazyLoadEvent){
    if(this.idDepositoSeleccionado){
      let request = await this.supabaseService.getDepositosDestinos(this.idDepositoSeleccionado);
      if(request.data){
        request.data.map(
          (value) => {
            this.destinos.push(value);
          }
        )
      }else{
        console.log(request.error);
      }
    }
  }

  ocultarDialog(){
    this.dialog = false;
    this.confirmado = false;
    this.formTransferencia.reset();
    this.articulo = new Articulo();
    this.dialogChange.emit(false);
  }

  async realizarTransferencia(){
    if(this.formTransferencia.valid){
      this.confirmado = true;

      console.log(this.formTransferencia.controls["destino"].value!);

      
      
      // let transferencia = await this.supabaseService.realizarTransferencia(
      //   this.idDepositoSeleccionado,
      //   (this.formTransferencia.controls["destino"].value![0] as Deposito).idDeposito,
      //   [this.articulo],
      //   this.formTransferencia.controls["cantidad"].value!);
      
    //   if(transferencia.dataEntrada && transferencia.dataSalida){
    //     this.ocultarDialog();
    //     this.messageService.add(
    //       {
    //         severity:'success', 
    //         summary: '??xito', 
    //         detail: 'Transferencia realizada correctamente.', 
    //         life: 3000}
    //     );
    //   }else{
    //     this.messageService.add(
    //       {
    //         severity:'error', 
    //         summary: 'Error', 
    //         detail: 'Algo fall?? al realizar la transferencia, intente de nuevo.', 
    //         life: 3000}
    //     );
    //   }
      

    // }else{
    //   this.formTransferencia.markAllAsTouched();
    }
    
  }


}
