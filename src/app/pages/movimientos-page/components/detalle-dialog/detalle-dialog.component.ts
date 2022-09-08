import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Movimiento } from 'src/app/models/Movimiento';

@Component({
  selector: 'app-detalle-dialog',
  templateUrl: './detalle-dialog.component.html',
  styleUrls: ['./detalle-dialog.component.css']
})
export class DetalleDialogComponent implements OnInit, OnDestroy {
  @Input() isVisible : boolean = false;
  @Input() movimiento! : Movimiento;
  @Input() titulo! : string;
  @Output() ocultar = new EventEmitter<boolean>();
  constructor() { }
  
  ngOnInit(): void {
    console.log(this.movimiento);
    
  }
  ocultarDialog(): void {
    this.ocultar.emit(false);
  }
  ngOnDestroy(): void {
    this.movimiento = {} as Movimiento;
    console.log(this.movimiento);
  }

}
