import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoriaArticulo } from 'src/app/models/categoriaArticulo';
import { SupabaseCategoriasService } from 'src/app/services/categorias-unidades/supabase-categorias.service';

@Component({
  selector: 'app-categorias-dialog',
  templateUrl: './categorias-dialog.component.html',
  styleUrls: ['./categorias-dialog.component.css']
})
export class CategoriasDialogComponent implements OnInit, OnChanges {

  @Input() categoria!: CategoriaArticulo;
  @Output() creando = new EventEmitter<boolean>;

  formCategoria: FormGroup = this.formBuilder.group(
    {nombre: new FormControl<string>(this.categoria ? this.categoria.nombreCategoria : "", Validators.required)}
  );

  @Input() dialog!: boolean;
  @Output() dialogChange = new EventEmitter<boolean>;

  confirmado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseCategoriasService,
    private messageService: MessageService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.dialog && this.categoria){
      this.formCategoria.controls['nombre'].setValue(this.categoria.nombreCategoria);
    }
  }

  ngOnInit(): void {

  }

  ocultarDialog(){
    this.dialog = false;
    this.confirmado = false;
    this.categoria = new CategoriaArticulo();
    this.formCategoria.reset();
    this.dialogChange.emit(this.dialog);
  }

  async cargarCategoria(){
    this.confirmado = true;

    if(this.formCategoria.valid){
      if(this.categoria && this.categoria.id){
        this.categoria.nombreCategoria = this.formCategoria.controls["nombre"].value;
        let update = await this.supabaseService.updateCategoria(this.categoria);
        if(update.data){
          this.creando.emit(false);
          this.ocultarDialog();
          
        }else{
          this.confirmado = false;
          this.messageService.add(
            {severity:'error', 
            summary: 'Error',
            detail: 'Error al actualizar la categoría. Intente de nuevo.',
            life: 4000}
          );
          console.log(update.error);
        }
      }else{
        let nueva = new CategoriaArticulo();
        nueva.nombreCategoria = this.formCategoria.controls["nombre"].value;

        let insert = await this.supabaseService.createCategoria(nueva);
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
            detail: 'Error al crear la categoría. Intente de nuevo.',
            life: 3000}
          );         
        }

        
      }
      
    }else{
      this.confirmado = false;
    }
  }

}
