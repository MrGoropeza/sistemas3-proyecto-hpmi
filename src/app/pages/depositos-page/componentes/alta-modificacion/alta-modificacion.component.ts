import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INPUTNUMBER_VALUE_ACCESSOR } from 'primeng/inputnumber';
import { Deposito } from 'src/app/models/Deposito';
import { ITipoDeposito } from 'src/app/models/ITipoDeposito';
import { Planta } from 'src/app/models/Planta';
import { Sector } from 'src/app/models/Sector';
import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { PlantaService } from 'src/app/services/deposito/planta.service';

import { SectorService } from 'src/app/services/deposito/sector.service';

@Component({
  selector: 'app-alta-modificacion',
  templateUrl: './alta-modificacion.component.html',
  styleUrls: ['./alta-modificacion.component.css']
})
export class AltaModificacionComponent implements OnInit {
  @Input() deposito : Deposito = new Deposito();
  listaTipoDepositos : ITipoDeposito[] = [];
  plantas : Planta[] = [];
  sectores : Sector[] = [];
  verSectores : boolean = false;
  constructor(private servicioDepositos : DepositoService,
    private servicioSectores : SectorService,
    private servicioPlantas : PlantaService) { }

  ngOnInit(): void {
    console.log(this.deposito.tipo);
    this.actualizar();
    this.obtenerDropdowns();
    
  }
  private obtenerDropdowns(){
    //this.listaTipoDepositos = this.servicioDepositos.getTipoDepositos();
    this.obtenerTipo();
    this.obtenerPlanta();
    //this.obtenerSector();
  }
  private obtenerTipo(){
    // this.servicioDepositos.getTipoDepositos().forEach(tipo => {
    //   this.listaTipoDepositos.push(tipo.nombre);
    // });
    this.servicioDepositos.getTipoDepositos().then(
      (data) =>{
        if(data.tipoDepositos != null){
          this.listaTipoDepositos = data.tipoDepositos;
        }

      },
      (error) => console.log("tenemos error: ",error)
    );
    
  }
    private obtenerPlanta(){
      this.servicioPlantas.getPlantas().then(
        (data) =>{
          
          if(data.data != null){
            this.plantas = data.data;
          }
  
        },
        (error) => console.log("tenemos error: ",error)
      );
    }
  //   private obtenerSector(){
  //     this.servicioSectores.getSector().then(
  //       (data) =>{
  //         if(data.data != null){
  //           this.sectores = data.data;
  //         }
  
  //       },
  //       (error) => console.log("tenemos error: ",error)
  //   );
  // }
  public actualizar(){
    this.servicioDepositos.setDeposito(this.deposito);
    
  }
  public mostrarSectoresPlanta(){
    this.actualizar();
    this.servicioSectores
      .getSectorXPlanta(this.servicioDepositos.getDeposito().planta)
      .then((sectores) => {
        if (sectores.data) {
          this.sectores = sectores.data;
          this.verSectores = true;
        }
      });
  }
}
