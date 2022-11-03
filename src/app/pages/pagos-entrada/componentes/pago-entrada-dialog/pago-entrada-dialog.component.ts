import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';
import { Comprobante } from 'src/app/models/Comprobante';
import { MetPago } from 'src/app/models/MetPago';
import { ObraSocialASeleccionarComponent } from 'src/app/pages/paciente-page/components/obra-social-aseleccionar/obra-social-aseleccionar.component';
import { PagosEntradaService } from 'src/app/services/pagos/pagos-entrada.service';

@Component({
  selector: 'app-pago-entrada-dialog',
  templateUrl: './pago-entrada-dialog.component.html',
  styleUrls: ['./pago-entrada-dialog.component.css']
})
export class PagoEntradaDialogComponent implements OnInit {

  @Input() pagosDialog!: boolean;
  @Output() pagosDialogChange = new EventEmitter<boolean>();

  formPago = this.formBuilder.group({
    obra: [null as any, Validators.required],
    metodo: ["", Validators.required],
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

}
