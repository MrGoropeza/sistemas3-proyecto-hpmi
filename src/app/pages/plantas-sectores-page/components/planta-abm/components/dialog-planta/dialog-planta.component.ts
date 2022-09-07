import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Planta } from 'src/app/models/Planta';
import { PlantaService } from 'src/app/services/deposito/planta.service';

@Component({
  selector: 'app-dialog-planta',
  templateUrl: './dialog-planta.component.html',
  styleUrls: ['./dialog-planta.component.css']
})
export class DialogPlantaComponent implements OnInit {
  @Input() display! : boolean;
  @Input() titulo!: string;
  band! : boolean;
  @Input() planta : Planta = {} as Planta;
  @Output() newItemEvent = new EventEmitter<Planta>(); 
  @Output() plantaGuardada = new EventEmitter<Planta>(); 
  constructor(private plantaServicio : PlantaService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }
  ocultarDialog(){
    this.display = false;
    this.planta = {} as Planta;
    this.newItemEvent.emit(this.planta);
  }
  guardarPlanta(){
    if(this.planta.nombre != undefined ){
      if(this.planta.idPlanta == undefined){
        this.plantaServicio.insert(this.planta).then(
          res => {
            if(res.data != null) {
              console.log(res.data[0]);
              this.planta = res.data[0];
              this.plantaGuardada.emit(this.planta);
              this.ocultarDialog();
            }
          }
        );
      }else{
        this.plantaServicio.update(this.planta).then(
          res => {
            if(res.data != null) {
              console.log(res.data[0]);
              this.planta = res.data[0];
              this.messageService.add({
                severity:'success', 
                summary: 'Éxito', 
                detail: 'Planta Actualizada con Exito', life: 3000
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
