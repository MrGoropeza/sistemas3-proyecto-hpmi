import { Component, Input, OnInit } from "@angular/core";
import { DetalleMovimiento } from "src/app/models/DetalleMovimiento";
import { DetalleMovimientoService } from "src/app/services/movimientos/detalle-movimiento.service";

@Component({
  selector: "app-detalle-abm",
  templateUrl: "./detalle-abm.component.html",
  styleUrls: ["./detalle-abm.component.css"],
})
export class DetalleABMComponent implements OnInit {
  @Input() id!: number;
  public detalles: DetalleMovimiento[] = [];
  constructor(private detalleService: DetalleMovimientoService) {}
  ngOnInit(): void {
    this.getDetalle();
  }
  public getDetalle(): void {
    this.detalleService.getDetalleMovimiento(this.id).then((detalles) => {
      if (detalles.data) {
        this.detalles = detalles.data;
      }
    });
  }
}
