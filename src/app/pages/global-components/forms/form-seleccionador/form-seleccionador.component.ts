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

  @Input() nameItem!: string;

  @Input() idItem!: string;
  @Input() labelIdItem!: string;

  @Input() valueItem!: string;
  @Input() labelValueItem!: string;

  constructor() { }

  ngOnInit(): void {

  }


}
