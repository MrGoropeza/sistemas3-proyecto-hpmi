import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { FilterOperator, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Articulo } from 'src/app/models/articulo';
import { categoriaArticulo } from 'src/app/models/categoriaArticulo';
import { unidadArticulo } from 'src/app/models/unidadArticulo';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class SupabaseArticulosService {

  supabase: SupabaseClient;

  constructor(
    private supabaseService: SupabaseService,
    private messageService: MessageService
  ) { 
    this.supabase = supabaseService.getSupabaseClient();
  }


  readCategorias(){
    return this.supabase.from<categoriaArticulo>("CategoriaArticulo")
      .select("id, nombre");
  }

  readUnidades(){
    return this.supabase.from<unidadArticulo>("UnidadArticulo")
      .select("id, nombre, abreviacion");
  }

  createArticulo(articulo: Articulo){
    return this.supabase.from("Articulo")
      .insert({
        nombre: articulo.nombre,
        "idCategoriaArticulo": articulo.categoria.id,
        descripcion: articulo.descripcion,
        "idUnidadArticulo": articulo.unidad.id,
        fechaVencimiento: articulo.fechaVencimiento,
        stock: articulo.stock        
      });
  }

  async getCantArticulos(){
    return await this.supabase.from("Articulo").select("id").eq('estado', true);
  }

  readArticulos(params?: any){

    let filterQuery = this.supabase.from("Articulo")
      .select(`
        id, 
        nombre, 
        descripcion, 
        stock,
        unidad: idUnidadArticulo (id, nombre, abreviacion),
        categoria: idCategoriaArticulo (id, nombre),
        fechaVencimiento`)
      .range(params.first, params.first + params.rows)
      .eq('estado', true);

    if(params.sortField){
      filterQuery = filterQuery
        .order(params.sortField,
          {ascending: params.sortOrder === 1}
        );
    }else{
      filterQuery = filterQuery
        .order('nombre');
    }

    if(params.globalFilter){
      filterQuery = filterQuery
        .ilike('nombre', "%"+params.globalFilter+"%");
    }

    return filterQuery;
  }


  updateArticulo(articulo: Articulo){
    return this.supabase
      .from('Articulo')
      .update({
        nombre: articulo.nombre,
        "idCategoriaArticulo": articulo.categoria.id,
        descripcion: articulo.descripcion,
        "idUnidadArticulo": articulo.unidad.id,
        fechaVencimiento: articulo.fechaVencimiento,
        stock: articulo.stock 
      })
      .eq('id', articulo.id)
  }

  deleteArticulo(articulo: Articulo){
    return this.supabase
      .from('Articulo')
      .update({
        estado: false
      })
      .eq('id', articulo.id);
  }

  deleteVariosArticulos(articulo: Articulo[]){
    return this.supabase
      .from('Articulo')
      .update(articulo)
      .eq('id', articulo);
  }

}