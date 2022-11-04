import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';
import { Comprobante } from 'src/app/models/Comprobante';
import { DetallePago } from "src/app/models/DetallePago";
import { MetPago } from 'src/app/models/MetPago';
import { ObraSocialASeleccionarComponent } from 'src/app/pages/paciente-page/components/obra-social-aseleccionar/obra-social-aseleccionar.component';
import { PagosEntradaService } from 'src/app/services/pagos/pagos-entrada.service';

@Component({
  selector: 'app-pago-entrada-dialog',
  templateUrl: './pago-entrada-dialog.component.html',
  styleUrls: ['./pago-entrada-dialog.component.css']
})
export class PagoEntradaDialogComponent implements OnInit {


  confirmado: boolean = false;

  @Input() pagosDialog!: boolean;
  @Output() pagosDialogChange = new EventEmitter<boolean>();

  formPago = this.formBuilder.group({
    obra: [null as any, Validators.required],
    metodo: [null as any, Validators.required],
    cantFacturas: [0, Validators.min(1)]
  });

  metodos: MetPago[] = [];

  facturasSeleccionadas: Comprobante[] = [];
  subtotal: number = 0;

  osref!: DynamicDialogRef;
  dialogFacturas: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private pagoService: PagosEntradaService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getMetodos();
    
    
  }

  ocultarDialog(){
    this.confirmado = false;
    this.facturasSeleccionadas = [];
    this.formPago.reset();
    this.formPago.markAsUntouched();
    this.pagosDialogChange.emit(false);
  }

  async getMetodos(){
    let requestMetodos = await this.pagoService.getMetPago()
    if(requestMetodos.error){console.log(requestMetodos.error); return;}

    if(requestMetodos.MetodosPago){
      this.metodos = requestMetodos.MetodosPago
    }
  }

  seleccionarObraSocial() {
    this.osref = this.dialogService.open(ObraSocialASeleccionarComponent, {
      header: "Seleccione una obra social",
      width: "70rem",
      height: "40rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
    });
    this.osref.onClose
      .pipe(
        map((res) => {
          if (res) {
            this.formPago.controls["obra"].setValue(res);
          }
        })
      )
      .subscribe();
  }

  facturaSeleccionada() {
    this.formPago.controls["cantFacturas"].setValue(this.facturasSeleccionadas.length);
  }

  async guardar(){

    this.formPago.controls["cantFacturas"].setValue(this.facturasSeleccionadas.length);

    this.formPago.markAllAsTouched();
    this.confirmado = true;
    
    if(this.formPago.valid){

      let idMetodo: number = this.formPago.controls['metodo'].value ? this.formPago.controls['metodo'].value.idMetPago : 0;
      let total = this.facturasSeleccionadas.reduce((prev, current) => prev + current.subTotal, 0)
      let idObraSocial: number = this.formPago.controls['obra'].value ? this.formPago.controls['obra'].value.idObraSocial : 0;


      let request = await this.pagoService.insertPagos(
        idMetodo,
        this.facturasSeleccionadas,
        idObraSocial,
        total,
        this.genNroFactura()
      )

      this.ocultarDialog();
    }
    this.confirmado = false;
  }  

  private genNroFactura() {
    let sucursal = (
      Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    ).toString();
    return sucursal + "-" + this.formatDate(new Date());
  }
  private padToNDigits(num: number, n: number) {
    return num.toString().padStart(n, "0");
  }

  private formatDate(date: Date) {
    return (
      date.getFullYear() +
      this.padToNDigits(date.getMonth() + 1, 2) +
      this.padToNDigits(date.getDate(), 1)
    );
  }

}
