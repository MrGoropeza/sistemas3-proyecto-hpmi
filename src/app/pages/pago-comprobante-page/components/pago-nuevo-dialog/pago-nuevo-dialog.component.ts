import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { SubscriptionLike } from "rxjs";
import { ArticuloComprobante } from "src/app/models/ArticuloComprobante";
import { Comprobante } from "src/app/models/Comprobante";
import { Proveedor } from "src/app/models/Proveedor";
import { ComprobantesService } from "src/app/services/comprobantes/comprobantes.service";
import { ProveedorService } from "src/app/services/proveedor/proveedor.service";
import { articulosValidator} from "src/app/validators/CustomValidator";
import {DetallePago} from "src/app/models/DetallePago";
import { metPago } from "src/app/models/enums/metPago";
@Component({
  selector: "app-pago-nuevo-dialog",
  templateUrl: "./pago-nuevo-dialog.component.html",
  styleUrls: ["./pago-nuevo-dialog.component.css"],
})
export class PagoNuevoDialogComponent implements OnInit {
  idTipoComprobante!: number;

  proveedor!: Proveedor;
  importe! : number;
  tiposFactura = ["A", "B", "C", "M", "E", "T"];
  metodosPago = ["efectivo","transferencia"];
  
  
  proveedoresSub!: SubscriptionLike;

  articulosSeleccionados: ArticuloComprobante[] = [];
  comprobantesSeleccionados : DetallePago[] = [];

  subtotal: number = 0;

  formComprobante: FormGroup = this.formBuilder.group({
    proveedor: [null, Validators.required],
    cantComprobantes: [0, Validators.min(1)],
    comprobantesValidos: [this.comprobantesSeleccionados, Validators.required],
    nroComprobante: [null, Validators.required],
    metPago: [null, Validators.required]
  });

  comprobantesVisible: boolean = false;
  proveedoresVisible: boolean = false;

  actualizarSubtotal(importe : number) {
    this.subtotal += importe;
     
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
    console.log(this.metodosPago);
  }



  proveedorSeleccionado(proveedor: Proveedor) {
    this.proveedor = proveedor;
    this.formComprobante.controls["proveedor"].setValue(proveedor);
    this.proveedoresVisible = false;
  }


  agregarComprobante(){
    this.comprobantesVisible = true;
  }
  

  // quitarArticulo(articulo: ArticuloComprobante){

  // }

  cerrar(){
    this.formComprobante.reset();
    this.ref.close();
  }
  comprobanteSeleccionado(comprobante : Comprobante){
    console.log("hola");
    let detalle = {} as DetallePago;
    detalle.comprobante = comprobante;
      this.comprobantesSeleccionados.push(detalle);

  }
  async guardar(){

  }

}
