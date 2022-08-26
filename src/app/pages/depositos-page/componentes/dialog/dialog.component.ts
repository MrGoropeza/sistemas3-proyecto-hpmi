import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Deposito } from 'src/app/models/Deposito';
import { IDeposito } from 'src/app/models/IDeposito';
import { DepositoService } from 'src/app/services/deposito.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Input() display : boolean = false;
  @Input() titulo : string = "";
  @Input() deposito : Deposito = new Deposito(); 
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Output() depositoGuardado = new EventEmitter<IDeposito>();
  constructor(
    private messageService: MessageService,
    private servicioDepositos : DepositoService
  ) { }

  ngOnInit(): void {
    console.log("holis desde el dialog",this.deposito.tipo);
    
  }
  ocultar(){
    this.display = false;
    this.newItemEvent.emit(false);
  }
  guardar(){
    console.log(this.servicioDepositos.getDeposito());
    this.depositoGuardado.emit(this.servicioDepositos.getDeposito());
    this.servicioDepositos.limpiarDeposito();
    this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Deposito registrado', life: 3000});
    this.ocultar();
  }
}