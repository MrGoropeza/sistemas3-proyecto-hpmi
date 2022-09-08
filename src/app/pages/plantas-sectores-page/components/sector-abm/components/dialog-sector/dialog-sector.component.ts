import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Planta } from 'src/app/models/Planta';
import { Sector } from 'src/app/models/Sector';
import { PlantaService } from 'src/app/services/deposito/planta.service';
import { SectorService } from 'src/app/services/deposito/sector.service';

@Component({
  selector: 'app-dialog-sector',
  templateUrl: './dialog-sector.component.html',
  styleUrls: ['./dialog-sector.component.css']
})
export class DialogSectorComponent implements OnInit {
  @Input() display! : boolean;
  @Input() titulo!: string;
  plantas : Planta[] = [];
  band! : boolean;
  @Input() sector :  Sector = {} as Sector;
  @Output() newItemEvent = new EventEmitter<Sector>(); 
  @Output() sectorGuardado = new EventEmitter<Sector>(); 
  constructor(private sectorService: SectorService,
    private messageService: MessageService,
  private plantaServicio : PlantaService) { }

  ngOnInit(): void {
    this.getPlantas();
  }
  ocultarDialog(){
    this.display = false;
    this.sector = {} as Sector;
    this.newItemEvent.emit(this.sector);
  }
  getPlantas(){
    this.plantaServicio.getPlantas().then(
      data => {
        if(data.data != null){
          console.log(data.data);
          
          this.plantas = data.data;
        }
      }
    );
  }

  guardarPlanta(){
    if(this.sector.nombre != undefined && this.sector.idPlanta != undefined){
      if(this.sector.idSector == undefined){
        this.sectorService.insert(this.sector).then(
          res => {
            if(res.data != null) {
              console.log(res.data[0]);
              this.sector = res.data[0];
              this.sectorGuardado.emit(this.sector);
              this.ocultarDialog();
            }
          }
        );
      }else{
        this.sectorService.update(this.sector).then(
          res => {
            if(res.data != null) {
              console.log(res.data[0]);
              this.sector = res.data[0];
              this.messageService.add({
                severity:'success', 
                summary: 'Éxito', 
                detail: ' Sector Actualizado con Exito', life: 3000
              });
              this.ocultarDialog();
            }
          }
        );
      }
    }else{
      this.band = true;
    }
}
}
