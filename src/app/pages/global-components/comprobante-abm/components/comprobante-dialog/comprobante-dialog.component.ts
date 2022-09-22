import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubscriptionLike } from 'rxjs';
import { ArticuloComprobante } from 'src/app/models/ArticuloComprobante';
import { ArticuloView } from 'src/app/models/ArticuloView';
import { Proveedor } from 'src/app/models/Proveedor';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';

@Component({
  selector: 'app-comprobante-dialog',
  templateUrl: './comprobante-dialog.component.html',
  styleUrls: ['./comprobante-dialog.component.css']
})
export class ComprobanteDialogComponent implements OnInit {

  proveedores: Proveedor[] = [];

  proveedoresSub!: SubscriptionLike;

  articulosSeleccionados: ArticuloComprobante[] = [];

  formComprobante: FormGroup = this.formBuilder.group({
    proveedor: ["", Validators.required],
    
  });

  

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private proveedorService: ProveedorService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.proveedoresSub = this.proveedorService.getProveedores()
      .subscribe(
        (response) => {this.proveedores = response}
      );
  }

  articuloSeleccionado(articulo: ArticuloComprobante){
    let encontrado = this.articulosSeleccionados.find((element) => element.id === articulo.id);
    
    if(encontrado === undefined){
      this.articulosSeleccionados.push(articulo);
    }else{
      let nuevoArray = this.articulosSeleccionados.filter(element => element.id !== articulo.id);
      nuevoArray.push(articulo);
      this.articulosSeleccionados = nuevoArray;
    }
  }

  quitarArticulo(articulo: ArticuloComprobante){
    let nuevoArray = this.articulosSeleccionados.filter(element => element.id !== articulo.id);
    this.articulosSeleccionados = [];
    this.articulosSeleccionados = nuevoArray;
  }

  cerrar(){
    this.ref.close();
    this.formComprobante.reset();
  }

  guardar(){
    this.formComprobante.markAllAsTouched();

    let valido = true;
    let error = "";

    if(this.formComprobante.valid){
      valido = this.formComprobante.valid;
    }else{
      error += "Elija un proveedor. ";
    }
    
    if(this.articulosSeleccionados.length > 0){
      this.articulosSeleccionados.forEach(
        element => {
          if(element.precio <= 0 || element.cantidad <= 0){
            valido = false;
          }
          if(!element.precio){
            valido = false;
          }
          if(!element.cantidad){
            valido = false;
          }
        }
      );
      if(!valido){
        error += "Verifique que las cantidades y precios sean positivas. ";
      }
    }else{
      valido = false;
      error += "Elija al menos un artículo. ";
    }
    

    if(valido){
      this.messageService.add(
        {severity: 'success',
        summary: 'Éxito',
        detail: 'Comprobante creado con éxito.'
        }
      );
    }else{
      this.messageService.add(
        {severity: 'error',
        summary: 'Error',
        detail: error
        }
      ); 
    }
  }

}
