import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, Observable, of, SubscriptionLike } from 'rxjs';
import { ArticuloComprobante } from 'src/app/models/ArticuloComprobante';
import { ArticuloMovimiento } from 'src/app/models/ArticuloMovimiento';
import { ArticuloView } from 'src/app/models/ArticuloView';
import { Cliente } from 'src/app/models/Cliente';
import { Comprobante } from 'src/app/models/Comprobante';
import { ObraSocial } from 'src/app/models/ObraSocial';
import { Proveedor } from 'src/app/models/Proveedor';
import { ObraSocialASeleccionarComponent } from 'src/app/pages/paciente-page/components/obra-social-aseleccionar/obra-social-aseleccionar.component';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { articulosValidator, NroFacturaRegExp } from 'src/app/validators/CustomValidator';
import { SeleccionarArticulosComponent } from '../seleccionar-articulos/seleccionar-articulos.component';

@Component({
  selector: 'app-comprobante-dialog',
  templateUrl: './comprobante-dialog.component.html',
  styleUrls: ['./comprobante-dialog.component.css']
})
export class ComprobanteDialogComponent implements OnInit {

  idTipoComprobante!: number;
  isEntrada! : boolean;

  proveedor!: Proveedor;
  obraSocial!: any;

  tiposFactura = ["A", "B", "C", "M", "E", "T"];

  proveedoresSub!: SubscriptionLike;

  articulosSeleccionados: ArticuloMovimiento[] = [];

  subtotal: number = 0;

  formComprobante: FormGroup = this.formBuilder.group({
    cantArticulos: [0, Validators.min(1)],
    articulosValidos: [this.articulosSeleccionados, [articulosValidator()]],
  });

  articulosVisible: boolean = false;
  proveedoresVisible: boolean = false;

  osref! : DynamicDialogRef;

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
    this.isEntrada = this.config.data.isEntrada;

    if(this.isEntrada){
      this.formComprobante.addControl("cliente", new FormControl(null, Validators.required));
    }else{
      this.formComprobante.addControl("proveedor", new FormControl(null, Validators.required));
      this.formComprobante.addControl("fecha", new FormControl(null, Validators.required))
    }

    if(this.idTipoComprobante === 1){
      this.formComprobante.addControl("fechaVencimiento", new FormControl(null, Validators.required));
      this.formComprobante.addControl("tipoFactura", new FormControl("", Validators.required));
      this.formComprobante.addControl("nroFactura", new FormControl("", [Validators.required, Validators.pattern(NroFacturaRegExp)]));
    }
  }

  articuloSeleccionado(articulo: ArticuloMovimiento){
    let encontrado = this.articulosSeleccionados.find((element) => element.id === articulo.id);

    
    
    if(encontrado === undefined){
      this.articulosSeleccionados.push(articulo);
      this.formComprobante.controls["cantArticulos"].setValue(this.articulosSeleccionados.length);
      this.formComprobante.controls['articulosValidos'].setValue(this.articulosSeleccionados);
    }else{
      let nuevoArray = this.articulosSeleccionados.filter(element => element.id !== articulo.id);
      nuevoArray.push(articulo);
      this.articulosSeleccionados = nuevoArray;
    }
  }

  proveedorSeleccionado(proveedor: Proveedor) {
    this.proveedor = proveedor;
    this.formComprobante.controls["proveedor"].setValue(proveedor);
    this.proveedoresVisible = false;
  }

  seleccionarObraSocial(){
    this.osref = this.dialogService.open(ObraSocialASeleccionarComponent,{
      header: "Seleccione una obra social",
      width: "70rem",
      height:"40rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000
    });
    this.osref.onClose.pipe(
      map((res)=>{
          if(res){
            this.obraSocial = res;
          }
      })
    ).subscribe();
  }

  // obraSeleccionada(obraSocial: ObraSocial) {
  //   this.obraSocial = obraSocial;
  //   this.formComprobante.controls["cliente"].setValue(obraSocial);
  //   this.clientesVisible = false;
  // }

  agregarArticulo(){
    this.articulosVisible = true;
  }
  

  quitarArticulo(articulo: ArticuloComprobante){
    let nuevoArray = this.articulosSeleccionados.filter(element => element.id !== articulo.id);
    this.articulosSeleccionados = [];
    this.articulosSeleccionados = nuevoArray;
  }

  cerrar(){
    this.formComprobante.reset();
    this.ref.close();
  }

  async guardar(){

    this.formComprobante.controls['articulosValidos'].setValue(this.articulosSeleccionados);
    this.formComprobante.markAllAsTouched();

    if(this.formComprobante.valid){

      let hoy = new Date(Date.now());


      let nuevoComprobante = {
        idProveedor: !this.isEntrada ? this.formComprobante.controls["proveedor"].value.idProveedor : null,
        idObraSocial: this.isEntrada ? this.formComprobante.controls["cliente"].value.idCliente : null,
        categoria: this.idTipoComprobante === 1 ? this.formComprobante.controls["tipoFactura"].value : null,
        numero: this.idTipoComprobante === 1 ? this.formComprobante.controls["nroFactura"].value : null,
        idTipoComprobante: {idTipoComprobante: this.idTipoComprobante},
        fechaComprobante: this.isEntrada ? null : this.formComprobante.controls["fecha"].value,
        fechaVencimiento: this.idTipoComprobante === 1 ? this.formComprobante.controls["fechaVencimiento"].value : null,
        
      } as Comprobante;

      // let idProveedor = this.formComprobante.controls["proveedor"].value.idProveedor;
      // let categoria;
      // if(this.idTipoComprobante === 1){
      //   categoria = this.formComprobante.controls["tipoFactura"].value;
      // }
      let request = await this.comprobanteService.addComprobante(
        this.articulosSeleccionados,
        nuevoComprobante
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
        console.log(request);
        
        this.messageService.add(
          {severity: 'error',
          summary: 'Error',
          detail: request.toString()
          }
        ); 
      } 
    }else{
      console.log(this.formComprobante.controls);
      
    }
  }

}
