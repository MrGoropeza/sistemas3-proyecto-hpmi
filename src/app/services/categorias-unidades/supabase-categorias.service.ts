import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { LazyLoadEvent } from 'primeng/api';
import { CategoriaArticulo } from 'src/app/models/categoriaArticulo';
import { SupabaseService } from '../supabase.service';

@Injectable({providedIn: 'root'})
export class SupabaseCategoriasService {

    private supabase: SupabaseClient

    constructor(
        private supabaseService: SupabaseService
    ) { 
        this.supabase = supabaseService.getSupabaseClient();
    }
    
    async createCategoria(categoria: CategoriaArticulo){
        const {data, error} = await this.supabase.from<CategoriaArticulo>("CategoriaArticulo")
            .insert(categoria);
        return {data, error};
    }

    async updateCategoria(categoria: CategoriaArticulo){
        const {data, error} = await this.supabase.from<CategoriaArticulo>("CategoriaArticulo")
            .update(categoria);
        return {data, error};
    }

    async readCategorias(params?: LazyLoadEvent){
        let query = this.supabase.from<CategoriaArticulo>("CategoriaArticulo")
            .select("id, nombreCategoria")
            .eq("estado", true);
            

        if(params?.first && params.rows){
            query = query.range(params.first, params.first + params.rows - 1);
        }

        if(params?.sortField && params.sortOrder){
            query = query.order(params.sortField as any, {ascending: params.sortOrder === 1});
        }

        if(params?.globalFilter){
            query = query.ilike("nombreCategoria", `%${params.globalFilter}%`);
        }

        const {data, error} = await query;
        return {data, error};
    }

    async getCantCategorias(): Promise<number> {
        const {count} = await this.supabase.from('CategoriaArticulo')
            .select("id", {head: true, count: "exact"})
            .eq("estado", true);
        return count ? count : 0;
    }

    async deleteCategoria(categoria: CategoriaArticulo){
        categoria.estado = false;
        const {data, error} = await this.supabase.from<CategoriaArticulo>("CategoriaArticulo")
            .update(categoria);
        return {data, error};
    }

}