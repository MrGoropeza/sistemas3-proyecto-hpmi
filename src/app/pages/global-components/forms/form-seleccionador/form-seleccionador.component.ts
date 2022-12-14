import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-seleccionador',
  templateUrl: './form-seleccionador.component.html',
  styleUrls: ['./form-seleccionador.component.css']
})
export class FormSeleccionadorComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() dialogVisible!: boolean;
  @Output() dialogVisibleChange = new EventEmitter<boolean>();

  @Output() buttonClick = new EventEmitter();

  @Input() nameItem!: string;

  @Input() idItem!: string;
  @Input() labelIdItem!: string;

  @Input() valueItem!: string;
  @Input() labelValueItem!: string;

  @Input() value2Item!: string;
  @Input() labelValue2Item!: string;

  constructor() { }

  ngOnInit(): void {

  }

  onButtonClick(){
    this.buttonClick.emit();
    this.dialogVisibleChange.emit(true);
  }


}
