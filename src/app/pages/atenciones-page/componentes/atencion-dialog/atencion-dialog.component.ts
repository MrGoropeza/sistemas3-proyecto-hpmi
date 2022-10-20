import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-atencion-dialog',
  templateUrl: './atencion-dialog.component.html',
  styleUrls: ['./atencion-dialog.component.css']
})
export class AtencionDialogComponent implements OnInit {

  @Input() dialogVisible: boolean = false;
  @Output() dialogVisibleChange: EventEmitter<boolean> = new EventEmitter();
  
  confirmado: boolean = false;

  formAtencion = this.formBuilder.group({
    fechaInicio: [null, Validators.required],
    fechaFin: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {

  }

  ocultarDialog(){
    this.confirmado = false;
    this.formAtencion.reset();
    this.dialogVisibleChange.emit(false);
  }

  cargarAtencion() {
    
  }
    

}
