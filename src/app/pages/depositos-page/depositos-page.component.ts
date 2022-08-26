import { Component, EventEmitter, OnInit } from '@angular/core';
import { Deposito } from 'src/app/models/Deposito';
import { IDeposito } from 'src/app/models/IDeposito';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DepositoService } from 'src/app/services/deposito.service';

@Component({
  selector: 'app-depositos-page',
  templateUrl: './depositos-page.component.html',
  styleUrls: ['./depositos-page.component.css']
})
export class DepositosPageComponent implements OnInit {
  // depositos
  listaDepositos : IDeposito[] = [];
  //depositos Seleccionados
  depositosSeleccionados : IDeposito[] = [];
  display: boolean = false;
  confirmado: boolean = false;
  deposito! : Deposito;

  titulo : string  = "";
  constructor(private servicioDepositos : DepositoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.deposito = new Deposito();
    this.obtenerDepositos();
    
  }
  private obtenerDepositos(){
    this.listaDepositos = this.servicioDepositos.getDepositos();
  }

  public nuevoDeposito(){
    this.display = true;
    this.titulo = "Agregar nuevo deposito";
  }
  public borrarDepositosSeleccionados(){
    this.confirmationService.confirm({
      message: '¿Estás seguro que queres eliminar los productos seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
          this.listaDepositos = this.listaDepositos.filter(val => !this.depositosSeleccionados.includes(val));
          this.depositosSeleccionados = [];
          this.messageService.add({
            severity:'success', 
            summary: 'Éxito', 
            detail: 'Artículos eliminados', life: 3000
          });
      }
  });
  }
  public editarDeposito(deposito : Deposito){
    this.display = true;
    this.titulo = "Editar deposito";
    this.deposito = deposito;
    console.log("holaa",this.deposito.tipo);
    
  }
  public eliminarDeposito(deposito: Deposito){
    this.confirmationService.confirm({
      message: '¿Estás seguro que querés borrar este deposito?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sí",
      rejectLabel: "No", 
      accept: () => {
          this.listaDepositos = this.listaDepositos.filter(val => val.id !== deposito.id);
          this.deposito = new Deposito();
          this.messageService.add({
            severity:'success',
            summary: 'Éxito', 
            detail: 'Articulo eliminado', 
            life: 3000,
          });
      }
  });
  }
  ocultarDialog(event : boolean){
    this.display = event;
    this.deposito = new Deposito();
  }
  guardarDeposito(deposito : IDeposito){
    console.log("hoola",deposito.id);
    if(deposito.id == undefined){
      deposito.id = this.getRandomInt(20,100);
      this.listaDepositos.push(deposito);
      console.log(this.listaDepositos);
      this.listaDepositos = [...this.listaDepositos];
    }else{
      console.log("matate");
      
    }

  }
  getRandomInt(min : number, max : number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }
}
