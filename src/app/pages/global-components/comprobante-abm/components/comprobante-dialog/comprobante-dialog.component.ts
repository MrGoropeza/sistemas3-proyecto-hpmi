import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubscriptionLike } from 'rxjs';
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

  formComprobante: FormGroup = this.formBuilder.group({
    proveedor: ["", Validators.required],
    articulosSeleccionados: [[] as ArticuloView[], Validators.required]
  });

  articulosSeleccionados: ArticuloView[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private proveedorService: ProveedorService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.proveedoresSub = this.proveedorService.getProveedores()
      .subscribe(
        (response) => {this.proveedores = response}
      );
  }

  articuloSeleccionado(articulo: ArticuloView){
    if(!this.articulosSeleccionados.find((element) => element.id === articulo.id)){
      
      this.formComprobante.addControl(
        `articulo${this.articulosSeleccionados.length}-precio`, 
        new FormControl(0, [Validators.required, Validators.min(0)])
      );
      this.formComprobante.addControl(
        `articulo${this.articulosSeleccionados.length}-cantidad`, 
        new FormControl(0, [Validators.required, Validators.min(0)])
      );
      this.articulosSeleccionados.push(articulo);
      
    }
    this.formComprobante.controls['articulosSeleccionados'].setValue(this.articulosSeleccionados);
  }

  quitarArticulo(articulo: ArticuloView){
    let nuevoArray = this.articulosSeleccionados.filter(element => element.id !== articulo.id);
    this.formComprobante
      .controls[`articulo${this.articulosSeleccionados.length-1}-precio`]
      .reset();
    this.formComprobante.removeControl(
      `articulo${this.articulosSeleccionados.length}-precio`
    );
    this.formComprobante
      .controls[`articulo${this.articulosSeleccionados.length-1}-cantidad`]
      .reset();
    this.formComprobante.removeControl(
      `articulo${this.articulosSeleccionados.length}-cantidad`
    );
    this.articulosSeleccionados = [];
    this.articulosSeleccionados = nuevoArray;
  }

  cerrar(){
    this.ref.close();
    this.formComprobante.reset();
  }

  guardar(){}

}
