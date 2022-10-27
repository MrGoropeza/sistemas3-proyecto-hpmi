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
import { correoValidator, CustomValidator, telefonoValidator } from "src/app/validators/CustomValidator";

@Component({
  selector: "app-proveedor-dialog",
  templateUrl: "./proveedor-dialog.component.html",
  styleUrls: ["./proveedor-dialog.component.css"],
})
export class ProveedorDialogComponent implements OnInit {
  proveedor: Proveedor = this.config.data.proveedor;
  proveedorForm = this.formBuilder.group({
    nombre: [this.proveedor.nombre, Validators.required],
    telefono: [this.proveedor.telefono, [Validators.required,Validators.pattern(telefonoValidator)]],
    correo: [this.proveedor.correo, [Validators.required,Validators.pattern(correoValidator)]],
    domicilio: [this.proveedor.domicilio, Validators.required],
    cuit: [this.proveedor.CUIT, [Validators.required,Validators.pattern(CustomValidator)]],
  });
  constructor(
    public ref: DynamicDialogRef,
    private servicioProveedor: ProveedorService,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log("",this.proveedor);
    
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
      this.proveedor.CUIT = this.proveedorForm.controls['cuit'].value || "";
      if(!this.proveedor.idProveedor){
        this.servicioProveedor.insert(this.proveedor).subscribe(
          (res)=>{
            this.ref.close(res);
          }
        );
        
        
      }else{
        this.ref.close(this.servicioProveedor.update(this.proveedor.idProveedor,this.proveedor).subscribe());
        
      }

      
    }
    
  }
}
