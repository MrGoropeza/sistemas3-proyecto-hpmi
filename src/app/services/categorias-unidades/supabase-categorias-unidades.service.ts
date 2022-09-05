import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { LazyLoadEvent } from 'primeng/api';
import { categoriaArticulo } from 'src/app/models/categoriaArticulo';
import { SupabaseService } from '../supabase.service';

@Injectable({providedIn: 'root'})
export class CategoriaUnidadesService {

    private supabase: SupabaseClient

    constructor(
        private supabaseService: SupabaseService
    ) { 
        this.supabase = supabaseService.getSupabaseClient();
    }
    
    async createCategoria(categoria: categoriaArticulo){
        const {data, error} = await this.supabase.from<categoriaArticulo>("CategoriaArticulo")
            .insert(categoria);
        return {data, error};
    }

    async updateCategoria(categoria: categoriaArticulo){
        const {data, error} = await this.supabase.from<categoriaArticulo>("CategoriaArticulo")
            .update(categoria);
        return {data, error};
    }

    async readCategorias(params?: LazyLoadEvent){
        let query = this.supabase.from<categoriaArticulo>("CategoriaArticulo")
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

    deleteCategoria(categoria: categoriaArticulo){

    }
}