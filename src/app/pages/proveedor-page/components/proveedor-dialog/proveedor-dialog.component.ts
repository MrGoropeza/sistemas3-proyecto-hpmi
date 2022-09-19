import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Proveedor, proveedorData } from "src/app/models/Proveedor";
import { ProveedorService } from "src/app/services/proveedor/proveedor.service";

@Component({
  selector: "app-proveedor-dialog",
  templateUrl: "./proveedor-dialog.component.html",
  styleUrls: ["./proveedor-dialog.component.css"],
})
export class ProveedorDialogComponent implements OnInit {
  proveedor: Proveedor = this.config.data.proveedor;
  proveedorForm = this.formBuilder.group({
    nombre: [this.proveedor.nombre, Validators.required],
    telefono: [this.proveedor.telefono, Validators.required],
    correo: [this.proveedor.correo, Validators.required],
    domicilio: [this.proveedor.domicilio, Validators.required],
  });
  constructor(
    public ref: DynamicDialogRef,
    private servicioProveedor: ProveedorService,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.proveedor);
    
  }
  cerrar() {
    this.ref.close();
  }
  guardar() {

    if(this.proveedorForm.valid){
      this.proveedor.nombre = this.proveedorForm.controls['nombre'].value || "";
      this.proveedor.correo = this.proveedorForm.controls['correo'].value || ""; 
      this.proveedor.domicilio = this.proveedorForm.controls['domicilio'].value || "";
      this.proveedor.telefono = this.proveedorForm.controls['telefono'].value || "";
      if(!this.proveedor.idProveedor){
        this.servicioProveedor.insert(this.proveedor);
      }else{
        this.servicioProveedor.update(this.proveedor.idProveedor,this.proveedor).subscribe(
          (response) => console.log(response)
        );
      }

      this.ref.close();
    }
    
  }
}