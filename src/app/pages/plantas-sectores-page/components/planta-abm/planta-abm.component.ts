import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Planta } from 'src/app/models/Planta';
import { PlantaService } from 'src/app/services/deposito/planta.service';

@Component({
  selector: 'app-planta-abm',
  templateUrl: './planta-abm.component.html',
  styleUrls: ['./planta-abm.component.css']
})
export class PlantaABMComponent implements OnInit{
  plantas : Planta[] = [];
  
  plantaSeleccionada : Planta = {} as Planta;
  display! : boolean;
  titulo : string ="";
  plantasSeleccionadas : Planta[] = [];
  constructor(
    private plantaServicio : PlantaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this.getPlantas();
  }
  public getPlantas(){
    this.plantaServicio.getPlantas().then(plantas =>{
      if(plantas.data != null){
        this.plantas = plantas.data;
      }
    });
  }
  public agregarPlanta(): void {
    this.display = true;
    this.titulo = "Agregar nueva Planta";
  }
  public editarPlanta(planta: Planta): void {
    this.display = true;
    this.plantaSeleccionada = planta;
    this.titulo = "Editar Planta";
  }
  public borrarPlantasSeleccionados(){
    this.confirmationService.confirm({
      message: '¿Estás seguro que queres eliminar las plantas seleccionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
          this.plantas = this.plantas.filter(val => !this.plantasSeleccionadas.includes(val));
          this.plantasSeleccionadas.forEach(element => {
            this.plantaServicio.disable(element.idPlanta);
          });
          this.plantasSeleccionadas = [];
          this.messageService.add({
            severity:'success', 
            summary: 'Éxito', 
            detail: 'Plantas eliminadas', life: 3000
          });
      }
  });
  }
  public insert(planta : Planta){
    this.plantas.push(planta);
    this.plantas = [...this.plantas];
    this.plantasSeleccionadas = this.plantasSeleccionadas.filter(val => val.idPlanta !== planta.idPlanta);
    this.messageService.add({
      severity:'success',
      summary: 'Éxito', 
      detail: 'Planta Almacenada con Exito', 
      life: 3000,
    });
  }
  public eliminarPlanta(planta: Planta){
    this.confirmationService.confirm({
      message: '¿Estás seguro que querés borrar esta Planta?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sí",
      rejectLabel: "No", 
      accept: () => {
          this.plantas = this.plantas.filter(val => val.idPlanta !== planta.idPlanta);
          this.plantaServicio.disable(planta.idPlanta);
          this.plantasSeleccionadas = this.plantasSeleccionadas.filter(val => val.idPlanta !== planta.idPlanta);
          this.messageService.add({
            severity:'success',
            summary: 'Éxito', 
            detail: 'Planta eliminada', 
            life: 3000,
          });
      }
  });
  }
  mostrar(){
    console.log(this.plantas);
    
    console.log(this.plantasSeleccionadas);
    
  }

}
