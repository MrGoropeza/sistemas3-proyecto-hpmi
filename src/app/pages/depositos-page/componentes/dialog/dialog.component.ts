import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Deposito } from 'src/app/models/Deposito';
import { IDeposito } from 'src/app/models/IDeposito';
import { DepositoService } from 'src/app/services/deposito/deposito.service';


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
  }
  ocultar(){
    this.display = false;
    this.newItemEvent.emit(false);
  }
  guardar(){
    this.depositoGuardado.emit(this.servicioDepositos.getDeposito());
    console.log(this.deposito.idDeposito);
    this.servicioDepositos.limpiarDeposito();
    this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Deposito registrado', life: 3000});
    this.ocultar();
  }
}
