import { Component, EventEmitter, OnInit } from '@angular/core';
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
    this.servicioDepositos.getDepositos().then(
      (depositos)=>{
        if(depositos.data != null){
          this.listaDepositos = depositos.data;
        }
      }
    )
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
          this.servicioDepositos.disable(deposito);
          this.listaDepositos = this.listaDepositos.filter(val => val.idDeposito !== deposito.idDeposito);
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
    console.log(this.deposito);
    
    if(deposito.idDeposito == undefined){
      this.servicioDepositos.insert(deposito).then(
        (data)=>{
          if(data.data !=null){
            console.log(data.data[0]);
            
            deposito.idDeposito = data.data[0].idDeposito;
            this.listaDepositos.push(deposito);
            this.listaDepositos = [...this.listaDepositos];
          }
        }
      );

    }else{
      //update incoming
      this.servicioDepositos.update(deposito);
    }

  }
  


}
