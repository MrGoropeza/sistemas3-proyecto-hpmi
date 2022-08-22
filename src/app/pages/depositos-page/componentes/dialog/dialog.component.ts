import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TarjetaComponent } from '../tarjetaHorizontal/tarjeta.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  implements OnInit  {
  @Input() display : boolean = false;
  @Output() newItemEvent = new EventEmitter<boolean>();
  constructor() {
    
  }

  ngOnInit(): void {
  }
  ocultar(){
    this.display = false;
    this.newItemEvent.emit(false);
  }

}
