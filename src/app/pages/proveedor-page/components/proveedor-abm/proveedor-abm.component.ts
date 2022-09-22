import { ThisReceiver } from "@angular/compiler";
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { map, Observable } from "rxjs";
import { Proveedor } from "src/app/models/Proveedor";
import { LoginPageComponent } from "src/app/pages/login-page/login-page.component";
import { ProveedorService } from "src/app/services/proveedor/proveedor.service";
import { ProveedorDialogComponent } from "../proveedor-dialog/proveedor-dialog.component";

@Component({
  selector: "app-proveedor-abm",
  templateUrl: "./proveedor-abm.component.html",
  styleUrls: ["./proveedor-abm.component.css"],
})
export class ProveedorABMComponent implements OnInit, OnDestroy {
  proveedores: Proveedor[] = [];
  isloading: boolean = true;
  ref!: DynamicDialogRef;
  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private servicioProveedor: ProveedorService,
    private messageService: MessageService
  ) {}
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  ngOnInit(): void {
    this.getProveedores();
  }

  private getProveedores(): void {
    this.servicioProveedor.getProveedores().subscribe((proveedores) => {
      if (proveedores) {
        this.proveedores = proveedores;
        this.isloading = false;
      }
    });
  }
  aniadir() {
    this.ref = this.dialogService.open(ProveedorDialogComponent, {
      header: "Añadir Proveedor",
      width: "21rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { proveedor: {} as Proveedor },
    });
    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.proveedores.push(res);
        this.messageService.add({
          severity: "success",
          summary: "Éxito",
          detail: "¡Proveedor modificado con exito!",
          life: 3000,
        });
      }
    });
  }
  eliminar(id: number) {
    this.confirmationService.confirm({
      message: "¿Estás seguro que desea borrar este proveedor?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
        this.servicioProveedor.delete(id).subscribe((res) => {
          console.log(res);
          if (res) {
            this.getProveedores();
            this.messageService.add({
              severity: "success",
              summary: "Éxito",
              detail: "Proveedor eliminado",
              life: 3000,
            });
          }
        });
      },
    });
  }
  editar(proveedor: Proveedor) {
    this.ref = this.dialogService.open(ProveedorDialogComponent, {
      header: "Editar Proveedor",
      width: "21rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { proveedor: proveedor },
    });
    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.messageService.add({
          severity: "success",
          summary: "Éxito",
          detail: "¡Proveedor modificado con exito!",
          life: 3000,
        });
      }
    });
  }
}
