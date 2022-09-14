import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { map } from "rxjs";
import { Proveedor } from "src/app/models/Proveedor";
import { ProveedorService } from "src/app/services/proveedor/proveedor.service";
import { ProveedorDialogComponent } from "../proveedor-dialog/proveedor-dialog.component";

@Component({
  selector: "app-proveedor-abm",
  templateUrl: "./proveedor-abm.component.html",
  styleUrls: ["./proveedor-abm.component.css"],
})
export class ProveedorABMComponent implements OnInit{
  proveedores: Proveedor[] = [];
  ref!: DynamicDialogRef;
  constructor(
    public dialogService: DialogService,
    private servicioProveedor: ProveedorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProveedores();
  }
  private getProveedores(): void {
    this.proveedores = [];
    this.servicioProveedor.getProveedores().then((proveedores) => {
      if (proveedores.data) {
        this.proveedores = proveedores.data;
      }
    });
  }
  
  aniadir() {
    this.ref = this.dialogService.open(ProveedorDialogComponent, {
      header: "Añadir Proveedor",
      width: "21rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: {proveedor: {} as Proveedor}
    });
    this.ref.onClose
      .pipe(
        map((result) => {
          this.getProveedores();
        })
      )
      .subscribe();
  }
  editar(proveedor : Proveedor) {
    this.ref = this.dialogService.open(ProveedorDialogComponent, {
      header: "Editar Proveedor",
      width: "21rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: {proveedor: proveedor}
    });
    this.ref.onClose
      .pipe(
        map((result) => {
          this.getProveedores();
        })
      )
      .subscribe();
  }
}
