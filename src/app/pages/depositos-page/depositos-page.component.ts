import { Component, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Deposito } from 'src/app/models/Deposito';
import { IDeposito } from 'src/app/models/IDeposito';
import { ConfirmationService, MessageService } from 'primeng/api';

import { SectorService } from 'src/app/services/deposito/sector.service';

import { Router } from '@angular/router';
import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { PlantaService } from 'src/app/services/deposito/planta.service';

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

  cargando! : boolean;

  titulo : string  = "";
  constructor(private servicioDepositos : DepositoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private servicioSectores : SectorService,
    private servicioPlantas : PlantaService,
    private router : Router) { }

  ngOnInit(): void {
    this.deposito = new Deposito();
    this.obtenerDepositos();
    
  }
  private obtenerDepositos(){
    this.cargando = true;
    this.servicioDepositos.getDepositos().then(
      (depositos)=>{
        if(depositos.data != null){
          this.listaDepositos = depositos.data;
          this.cargando = false;
        }
      },
      () => {this.cargando = false}
    )
  }

  public nuevoDeposito(){
    this.display = true;
    this.titulo = "Agregar nuevo deposito";
  }
  public borrarDepositosSeleccionados(){
    this.confirmationService.confirm({
      message: '¿Estás seguro que desea eliminar los depositos seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
          this.listaDepositos = this.listaDepositos.filter(val => !this.depositosSeleccionados.includes(val));
          this.depositosSeleccionados.forEach(element => {
            this.servicioDepositos.disable(element);
          });
          this.depositosSeleccionados = [];
          this.messageService.add({
            severity:'success', 
            summary: 'Éxito', 
            detail: 'Depositos eliminados', life: 3000
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
          this.servicioDepositos.disable(deposito);
          this.listaDepositos = this.listaDepositos.filter(val => val.idDeposito !== deposito.idDeposito);
          this.depositosSeleccionados =this.depositosSeleccionados.filter(val => val.idDeposito !== deposito.idDeposito);
          this.deposito = new Deposito();
          this.messageService.add({
            severity:'success',
            summary: 'Éxito', 
            detail: 'Deposito eliminado', 
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
    console.log(this.deposito);
    
    if(deposito.idDeposito == undefined){
      this.servicioDepositos.insert(deposito).then(
        (data)=>{
          if(data.data !=null){
            console.log(data.data[0]);
            
            deposito.idDeposito = data.data[0].idDeposito;
            this.listaDepositos.push(deposito);
            this.listaDepositos = [...this.listaDepositos];
            this.messageService.add({
              severity:'success', 
              summary: 'Éxito', 
              detail: 'Deposito Guardado con exito', life: 3000
            });
          }
        }
      );

    }else{
      //update incoming
      this.servicioDepositos.update(deposito);
      this.messageService.add({
        severity:'success', 
        summary: 'Éxito', 
        detail: 'Deposito Actualizado con exito', life: 3000
      });
    }

  }
  


}
