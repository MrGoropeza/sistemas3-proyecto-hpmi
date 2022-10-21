import { Component, IterableDiffers, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ObraSocial } from 'src/app/models/ObraSocial';
import { ObraSocialService } from 'src/app/services/obraSociales/obra-social.service';
import { CustomValidator } from 'src/app/validators/CustomValidator';

@Component({
  selector: 'app-obra-social-alta-dialog',
  templateUrl: './obra-social-alta-dialog.component.html',
  styleUrls: ['./obra-social-alta-dialog.component.css']
})
export class ObraSocialAltaDialogComponent implements OnInit {
  obraSocial : ObraSocial = this.config.data.item;
  Form = this.formBuilder.group({
    nombre: [this.obraSocial.nombre, Validators.required],
    cuit: [
      this.obraSocial.cuit,
      [Validators.required, Validators.pattern(CustomValidator)],
    ],
    telefono: [this.obraSocial.telefono, Validators.required],
    correo: [this.obraSocial.correo, Validators.required],
    domicilio: [this.obraSocial.domicilio, Validators.required],
  });
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private obraSocialService : ObraSocialService
  ) {}
  ngOnInit(): void {
  }
  guardar(){
    if(this.Form.valid){
      this.obraSocial.nombre = this.Form.controls["nombre"].value || "";
      this.obraSocial.cuit = this.Form.controls["cuit"].value || "";
      this.obraSocial.domicilio = this.Form.controls["domicilio"].value || "";
      this.obraSocial.correo = this.Form.controls["correo"].value || "";
      this.obraSocial.telefono = this.Form.controls["telefono"].value || "";
      console.log("hola");
      
      if(!this.obraSocial.idObraSocial){
        console.log("holis");
        
        this.obraSocialService.insert(this.obraSocial).then((res)=>{
          this.ref.close();         
          this.messageService.add({
            severity: "success",
            summary: "Éxito",
            detail: "¡Obra Social registrada con exito!",
            life: 3000,
          });
        });
          
      }else{
        this.obraSocialService.update(this.obraSocial).then((res)=>{
          this.ref.close();         
          this.messageService.add({
            severity: "success",
            summary: "Éxito",
            detail: "¡Obra Social modificada con exito!",
            life: 3000,
          });
        });
        
      }
    }
  }
  cerrar(){
    this.ref.close();
  }

}
