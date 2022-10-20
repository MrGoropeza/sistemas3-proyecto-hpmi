import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Comprobante } from 'src/app/models/Comprobante';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-pedidos-page',
  templateUrl: './pedidos-page.component.html',
  styleUrls: ['./pedidos-page.component.css']
})
export class PedidosPageComponent implements OnInit {

  @Input() comprobantes!: Comprobante[];
  @Input() titulo!: string;
  @Input() idTipoComprobante!: number;

  ref!: DynamicDialogRef;

  loading: boolean = true;
  constructor(
    private dialogService: DialogService,
    private pedidosService: PedidosService,
  ) { }

  ngOnInit(): void {
  }

  eliminar(_t36: any) {
    
  }
  verDetalle(_t36: any) {
    
  }
    
  aniadir() {
    
  }

}
