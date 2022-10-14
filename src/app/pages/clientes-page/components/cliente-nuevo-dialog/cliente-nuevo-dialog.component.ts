import { getLocaleMonthNames } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Cliente } from "src/app/models/Cliente";
import { ClienteService } from "src/app/services/clientes/cliente.service";
import { CustomValidator } from "src/app/validators/CustomValidator";

@Component({
  selector: "app-cliente-nuevo-dialog",
  templateUrl: "./cliente-nuevo-dialog.component.html",
  styleUrls: ["./cliente-nuevo-dialog.component.css"],
})
export class ClienteNuevoDialogComponent implements OnInit {
  tposPersona: string[] = ["juridica", "fisica"];
  cliente: Cliente = this.config.data.cliente;
  clienteForm = this.formBuilder.group({
    nombre: [this.cliente.nombre, Validators.required],
    apellido: [this.cliente.apellido, Validators.required],
    telefono: [this.cliente.telefono, Validators.required],
    correo: [this.cliente.correo, Validators.required],
    domicilio: [this.cliente.domicilio, Validators.required],
    cuit: [
      this.cliente.CUIT,
      [Validators.required, Validators.pattern(CustomValidator)],
    ],
    tipo: [this.cliente.tipoPersona, Validators.required],
    dni: [this.cliente.dniCliente, Validators.required],
    fechaNacimiento: [this.cliente.fechaNacimiento, Validators.required],
  });
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log("hola");
    console.log(this.cliente.idCliente);
    
  }

  cerrar() {
    this.ref.close();
  }
  guardar() {
    if (this.cliente.tipoPersona == "fisica") {
      this.cliente.apellido =
        this.clienteForm.controls["apellido"].value || "";
      this.cliente.dniCliente = this.clienteForm.controls["dni"].value || "";
      this.cliente.fechaNacimiento =
        this.clienteForm.controls["fechaNacimiento"].value || new Date();
    }
    this.cliente.nombre = this.clienteForm.controls["nombre"].value || "";
    this.cliente.correo = this.clienteForm.controls["correo"].value || "";
    this.cliente.domicilio = this.clienteForm.controls["domicilio"].value || "";
    this.cliente.telefono = this.clienteForm.controls["telefono"].value || "";
    this.cliente.CUIT = this.clienteForm.controls["cuit"].value || "";
    console.log(this.cliente);
    if(!this.cliente.idCliente){
      this.clienteService.insert(this.cliente).then(
        (res)=>{
          this.ref.close(this.cliente);
          this.messageService.add({
            severity: "success",
            summary: "Éxito",
            detail: "¡Cliente registrado con exito!",
            life: 3000,
          });
        }
      );
    }else{
      this.clienteService.update(this.cliente).then(
        (res)=>{
          this.ref.close(this.cliente);
          this.messageService.add({
            severity: "success",
            summary: "Éxito",
            detail: "¡Cliente modificado con exito!",
            life: 3000,
          });
        }
      );
    }

  }
}
