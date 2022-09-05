import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categoriaArticulo } from 'src/app/models/categoriaArticulo';
import { CategoriaUnidadesService } from 'src/app/services/categorias-unidades/supabase-categorias-unidades.service';

@Component({
  selector: 'app-categorias-dialog',
  templateUrl: './categorias-dialog.component.html',
  styleUrls: ['./categorias-dialog.component.css']
})
export class CategoriasDialogComponent implements OnInit {

  @Input() categoria!: categoriaArticulo;
  @Output() categoriaChange = new EventEmitter<categoriaArticulo>;

  formCategoria: FormGroup = this.formBuilder.group(
    {nombre: [this.categoria ? this.categoria.nombreCategoria : "", Validators.required]}
  );

  @Input() dialog!: boolean;
  @Output() dialogChange = new EventEmitter<boolean>;

  confirmado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private supabaseService: CategoriaUnidadesService
  ) { }

  ngOnInit(): void {

  }

  ocultarDialog(){
    this.dialog = false;
    this.confirmado = false;
    this.formCategoria.reset();
    this.dialogChange.emit(this.dialog);
  }

  async cargarCategoria(){
    this.confirmado = true;

    if(this.formCategoria.valid){
      if(this.categoria){
        let update = await this.supabaseService.updateCategoria(this.categoria);
        if(update.data){
          this.categoriaChange.emit(update.data[0]);
        }else{
          console.log(update.error);
        }
      }else{
        let nueva = new categoriaArticulo();
        nueva.nombreCategoria = this.formCategoria.controls["nombre"].value;

        let insert = await this.supabaseService.createCategoria(nueva);
        if(insert.data){
          nueva.id = insert.data[0].id;
          nueva.estado = insert.data[0].estado;
          this.ocultarDialog();
        }else{
          this.confirmado = false;
          console.log(insert.error);          
        }

        this.categoriaChange.emit(nueva);
      }
      
    }else{
      this.confirmado = false;
    }
  }

}
