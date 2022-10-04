import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, of, SubscriptionLike } from 'rxjs';
import { ArticuloComprobante } from 'src/app/models/ArticuloComprobante';
import { ArticuloView } from 'src/app/models/ArticuloView';
import { Proveedor } from 'src/app/models/Proveedor';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { SeleccionarArticulosComponent } from '../seleccionar-articulos/seleccionar-articulos.component';

@Component({
  selector: 'app-comprobante-dialog',
  templateUrl: './comprobante-dialog.component.html',
  styleUrls: ['./comprobante-dialog.component.css']
})
export class ComprobanteDialogComponent implements OnInit {

  idTipoComprobante!: number;

  proveedor!: Proveedor;

  tiposFactura = ["A", "B", "C", "M", "E", "T"];

  proveedoresSub!: SubscriptionLike;

  articulosSeleccionados: ArticuloComprobante[] = [];

  subtotal: number = 0;

  formComprobante: FormGroup = this.formBuilder.group({
    proveedor: [null, Validators.required],
    tipoFactura: [null, Validators.required],
    fechaVencimiento: [null, Validators.required],
    fecha: [null, Validators.required],
  });

  articulosVisible: boolean = false;
  proveedoresVisible: boolean = false;

  actualizarSubtotal() {
    let sub = 0;
    this.articulosSeleccionados.forEach(
      articulo => {
        if(articulo.cantidad && articulo.precio){
          sub += articulo.cantidad * articulo.precio;
        }
      }
    );

    this.subtotal = sub;
  }

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private dialogService: DialogService,
    private proveedorService: ProveedorService,
    private comprobanteService: ComprobantesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.idTipoComprobante = this.config.data.idTipoComprobante;

    if(this.idTipoComprobante === 1){
      this.formComprobante.addControl("tipoFactura", new FormControl("", Validators.required));
    }
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

  proveedorSeleccionado(proveedor: Proveedor) {
    this.proveedor = proveedor;
    this.proveedoresVisible = false;
  }

  agregarArticulo(){
    this.articulosVisible = true;
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

  async guardar(){


    this.formComprobante.markAllAsTouched();

    let error = "";

    if(!this.proveedor){
      error += "Elija un proveedor. ";
    }

    if(this.idTipoComprobante === 1 
        && this.formComprobante.controls["tipoFactura"].value === ""){
      error += "Elija un tipo de Factura. ";
    }
    
    if(this.articulosSeleccionados.length > 0){
      let articulosValidos = true;
      this.articulosSeleccionados.forEach(
        element => {
          if(element.precio <= 0 || element.cantidad <= 0){
            articulosValidos = false;
          }
          if(!element.precio){
            articulosValidos = false;
          }
          if(!element.cantidad){
            articulosValidos = false;
          }
        }
      );
      if(!articulosValidos){
        error += "Verifique que las cantidades y precios sean positivas. ";
      }
    }else{
      error += "Elija al menos un artículo. ";
    }
    

    if(error === ""){

      let idProveedor = this.formComprobante.controls["proveedor"].value.idProveedor;
      let categoria;
      if(this.idTipoComprobante === 1){
        categoria = this.formComprobante.controls["tipoFactura"].value;
      }
      let request = await this.comprobanteService.addComprobante(
        idProveedor,
        this.idTipoComprobante,
        this.articulosSeleccionados,
        categoria
      );

      if(request.length == 0){
        this.cerrar();
        this.messageService.add(
          {severity: 'success',
          summary: 'Éxito',
          detail: 'Comprobante creado con éxito.'
          }
        );
      }else{
        // console.log(request);
        
        this.messageService.add(
          {severity: 'error',
          summary: 'Error',
          detail: request.toString()
          }
        ); 
      }

      
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
