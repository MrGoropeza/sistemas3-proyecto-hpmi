import { Component, Input, OnInit } from '@angular/core';
import { INPUTNUMBER_VALUE_ACCESSOR } from 'primeng/inputnumber';
import { Deposito } from 'src/app/models/Deposito';
import { ITipoDeposito } from 'src/app/models/ITipoDeposito';
import { Planta } from 'src/app/models/Planta';
import { Sector } from 'src/app/models/Sector';
import { DepositoService } from 'src/app/services/deposito.service';
import { PlantaService } from 'src/app/services/planta.service';
import { SectorService } from 'src/app/services/sector.service';

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
  constructor(private servicioDepositos : DepositoService,
    private servicioSectores : SectorService,
    private servicioPlantas : PlantaService) { }

  ngOnInit(): void {
    console.log(this.deposito.tipo);
    this.obtenerDropdowns();
    
  }
  private obtenerDropdowns(){
    this.listaTipoDepositos = this.servicioDepositos.getTipoDepositos();
    this.plantas = this.servicioPlantas.getPlantas();
    this.sectores = this.servicioSectores.getSector();
  }




}
