import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Sector } from 'src/app/models/Sector';
import { SectorService } from 'src/app/services/deposito/sector.service';

@Component({
  selector: 'app-sector-abm',
  templateUrl: './sector-abm.component.html',
  styleUrls: ['./sector-abm.component.css']
})
export class SectorABMComponent implements OnInit {
  sectores : Sector[] = [];
  sectoresSeleccionados : Sector[] = [];
  display! : boolean;
  titulo : string ="";
  sectorSeleccionado : Sector = {} as Sector;

  cargando!: boolean;

  constructor(private sectorServicio: SectorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getSectores();
  }
  public getSectores(){
    this.cargando = true;
    this.sectorServicio.getSectorFull().then(
      sectors => {
        if(sectors.data != null){
          this.sectores = sectors.data;
          this.cargando = false;
        }
      },
      () => {this.cargando = false}
    );
  }
  public agregarSector(): void {
    this.display = true;
    this.titulo = "Agregar nuevo Sector";
  }
  public editarSector(sector : Sector): void {
    this.display = true;
    this.sectorSeleccionado = sector;
    this.titulo = "Editar Sector";
  }
  public borrarSectoresSeleccionados(){
    this.confirmationService.confirm({
      message: '¿Estás seguro que queres eliminar los sectores seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
          this.sectores = this.sectores.filter(val => !this.sectoresSeleccionados.includes(val));
          this.sectoresSeleccionados.forEach(element => {
            this.sectorServicio.disable(element.idSector);
          });
          this.sectoresSeleccionados = [];
          this.messageService.add({
            severity:'success', 
            summary: 'Éxito', 
            detail: 'Sectores Eliminados', life: 3000
          });
      }
  });
  }
  public async insert(sector : Sector){
    console.log(sector);
    const nombre = await this.sectorServicio.getNombrePlanta(sector);
    if(nombre.data){
      sector.idPlanta = nombre.data[0].idPlanta; 
      this.sectores.push(sector);
      this.sectores = [...this.sectores];
      this.sectoresSeleccionados = this.sectoresSeleccionados.filter(val => val.idSector !== sector.idSector);
      this.messageService.add({
        severity:'success',
        summary: 'Éxito', 
        detail: 'Sector almacenado con Exito', 
        life: 3000,
      });
    }

  }
  public eliminarSector(sector : Sector){
    this.confirmationService.confirm({
      message: '¿Estás seguro que querés borrar este sector?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sí",
      rejectLabel: "No", 
      accept: () => {
          this.sectores = this.sectores.filter(val => val.idSector !== sector.idSector);
          this.sectorServicio.disable(sector.idSector);
          this.sectoresSeleccionados = this.sectoresSeleccionados.filter(val => val.idSector !== sector.idSector);
          this.messageService.add({
            severity:'success',
            summary: 'Éxito', 
            detail: 'Sector eliminado', 
            life: 3000,
          });
      }
  });
  }
}
