import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UnidadArticulo } from 'src/app/models/unidadArticulo';
import { SupabaseUnidadesService } from 'src/app/services/categorias-unidades/supabase-unidades.service';

@Component({
  selector: 'app-unidades-dialog',
  templateUrl: './unidades-dialog.component.html',
  styleUrls: ['./unidades-dialog.component.css']
})
export class UnidadesDialogComponent implements OnInit {

  @Input() unidad!: UnidadArticulo;
  @Output() creando = new EventEmitter<boolean>;

  formUnidad: FormGroup = this.formBuilder.group(
    {
      nombre: new FormControl<string>(this.unidad ? this.unidad.nombre : "", Validators.required),
      abreviacion: new FormControl<string>(this.unidad ? this.unidad.abreviacion : "", Validators.required)
    }
  );

  @Input() dialog!: boolean;
  @Output() dialogChange = new EventEmitter<boolean>;

  confirmado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseUnidadesService,
    private messageService: MessageService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.dialog && this.unidad){
      this.formUnidad.controls['nombre'].setValue(this.unidad.nombre);
      this.formUnidad.controls['abreviacion'].setValue(this.unidad.abreviacion);
    }
  }

  ngOnInit(): void {

  }

  ocultarDialog(){
    this.dialog = false;
    this.confirmado = false;
    this.unidad = new UnidadArticulo();
    this.formUnidad.reset();
    this.dialogChange.emit(this.dialog);
  }

  async cargarUnidad(){
    this.confirmado = true;

    if(this.formUnidad.valid){
      if(this.unidad && this.unidad.id){
        this.unidad.nombre = this.formUnidad.controls["nombre"].value;
        this.unidad.abreviacion = this.formUnidad.controls["abreviacion"].value;
        let update = await this.supabaseService.updateUnidad(this.unidad);
        if(update.data){
          this.creando.emit(false);
          this.ocultarDialog();
          
        }else{
          this.confirmado = false;
          this.messageService.add(
            {severity:'error', 
            summary: 'Error',
            detail: 'Error al actualizar la unidad. Intente de nuevo.',
            life: 4000}
          );
          console.log(update.error);
        }
      }else{
        let nueva = new UnidadArticulo();
        nueva.nombre = this.formUnidad.controls["nombre"].value;
        nueva.abreviacion = this.formUnidad.controls["abreviacion"].value;

        let insert = await this.supabaseService.createUnidad(nueva);
        if(insert.data){
          nueva.id = insert.data[0].id;
          nueva.estado = insert.data[0].estado;
          this.ocultarDialog();
          
          this.creando.emit(true);
        }else{
          this.confirmado = false;
          console.log(insert.error); 
          this.messageService.add(
            {severity:'error', 
            summary: 'Error',
            detail: 'Error al crear la unidad. Intente de nuevo.',
            life: 3000}
          );         
        }

        
      }
      
    }else{
      this.confirmado = false;
    }
  }

}
