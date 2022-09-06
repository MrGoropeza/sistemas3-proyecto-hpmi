import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { LazyLoadEvent } from 'primeng/api';
import { UnidadArticulo } from 'src/app/models/unidadArticulo';
import { SupabaseService } from '../supabase.service';

@Injectable({providedIn: 'root'})
export class SupabaseUnidadesService {

    private supabase: SupabaseClient

    constructor(
        private supabaseService: SupabaseService
    ) { 
        this.supabase = supabaseService.getSupabaseClient();
    }
    
    async createUnidad(unidad: UnidadArticulo){
        const {data, error} = await this.supabase
            .from<UnidadArticulo>("UnidadArticulo")
            .insert(unidad);
        return {data, error};
    }

    async updateUnidad(unidad: UnidadArticulo){
        const {data, error} = await this.supabase
            .from<UnidadArticulo>("UnidadArticulo")
            .update(unidad);
        return {data, error};
    }

    async readUnidades(params?: LazyLoadEvent){
        let query = this.supabase.from<UnidadArticulo>("UnidadArticulo")
            .select("id, nombre, abreviacion")
            .eq("estado", true);
            

        if(params?.first && params.rows){
            query = query.range(params.first, params.first + params.rows - 1);
        }

        if(params?.sortField && params.sortOrder){
            query = query.order(params.sortField as any, {ascending: params.sortOrder === 1});
        }

        if(params?.globalFilter){
            query = query.ilike("nombre", `%${params.globalFilter}%`);
        }

        const {data, error} = await query;
        return {data, error};
    }

    async getCantUnidades(): Promise<number> {
        const {count} = await this.supabase.from('UnidadArticulo')
            .select("id", {head: true, count: "exact"})
            .eq("estado", true);
        return count ? count : 0;
    }

    async deleteUnidad(unidad: UnidadArticulo){
        unidad.estado = false;
        const {data, error} = await this.supabase.from<UnidadArticulo>("UnidadArticulo")
            .update(unidad);
        return {data, error};
    }

}