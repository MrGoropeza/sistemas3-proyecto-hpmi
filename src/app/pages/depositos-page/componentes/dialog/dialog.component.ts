import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Deposito } from 'src/app/models/Deposito';

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
  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    console.log("holis desde el dialog",this.deposito.tipo);
    
  }
  ocultar(){
    this.display = false;
    this.newItemEvent.emit(false);
  }
  guardar(){
    this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Deposito registrado', life: 3000});
    this.ocultar();
  }
}
