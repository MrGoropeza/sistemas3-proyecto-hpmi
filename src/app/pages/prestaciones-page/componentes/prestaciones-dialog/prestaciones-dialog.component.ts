import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Prestacion } from 'src/app/models/prestacion';
import { PrestacionesService } from 'src/app/services/prestaciones/prestaciones.service';

@Component({
  selector: 'app-prestaciones-dialog',
  templateUrl: './prestaciones-dialog.component.html',
  styleUrls: ['./prestaciones-dialog.component.css']
})
export class PrestacionesDialogComponent implements OnInit {

  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();

  @Input() prestacion!: Prestacion;
  @Output() prestacionCargada = new EventEmitter();
  
  confirmado: boolean = false;

  formPrestacion = this.formBuilder.group({
    codigo: [this.prestacion ? this.prestacion.codigo : "", [Validators.required, Validators.pattern("([0-9][0-9]\.)+")]],
    nombre: [this.prestacion ? this.prestacion.nombre : "", Validators.required],
    precio: [this.prestacion ? this.prestacion.precio : 0, [Validators.required, Validators.min(1)]],
  })

  constructor(
    private formBuilder: FormBuilder,
    private prestacionesService: PrestacionesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

  }

  ocultarDialog(){
    this.formPrestacion.reset();
    this.confirmado = false;
    this.visibleChange.emit(false);
  }
  

  async cargarPrestacion(){
    this.confirmado = true;


    if(this.formPrestacion.valid){
      this.prestacion = {} as Prestacion;
      this.prestacion.codigo = this.formPrestacion.controls["codigo"].value!;
      this.prestacion.nombre = this.formPrestacion.controls["nombre"].value!;
      this.prestacion.precio = this.formPrestacion.controls["precio"].value!;
      let request = await this.prestacionesService.createPrestacion(this.prestacion);
      if(request.data){
        this.prestacionCargada.emit();
        this.ocultarDialog();
        this.messageService.add({
          summary: "Éxito",
          detail: "Prestación guardada con éxito.",
          severity: "success",
        });

      }else{
        this.messageService.add({
          summary: "Error",
          detail: "Error al guardar la prestación. Intente de nuevo.",
          severity: "error",
        });
      }
    }
    this.confirmado = false;
  }

}
