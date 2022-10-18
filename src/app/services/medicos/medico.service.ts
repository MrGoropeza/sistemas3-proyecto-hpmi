import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { LazyLoadEvent } from "primeng/api";
import { Medico } from "src/app/models/Medico";
import { SupabaseService } from "../supabase.service";

@Injectable({
  providedIn: "root",
})
export class MedicoService {
  supabase: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
    this.supabase = supabaseService.getSupabaseClient();
  }
  async getCantMedicos() {
    return await this.supabase
      .from<Medico>("Medico")
      .select("idMedico")
      .eq("estado", true);
  }

  async getMedicos(params?: LazyLoadEvent) {
    let query = this.supabase
      .from<Medico>("Medico")
      .select(
        `
    idMedico,
    persona : idPersona(idPersona,nombre,apellido),
    Cargo,
    fechaRegistro,
    Especialidad`
      )
      .eq("estado", true)
      .order("idMedico", { ascending: false });

    if (params?.first !== undefined && params?.rows !== undefined) {
      query = query.range(params?.first, params?.first + params?.rows - 1);
    }

    if (params?.sortField !== undefined && params?.sortOrder !== undefined) {
      query = query.order(params.sortField as any, {
        ascending: params.sortOrder === 1,
      });
    }

    if (params?.globalFilter) {
      query = query.or(
        `or(Especialidad.ilike.%${params.globalFilter}%,Cargo.ilike.%${params.globalFilter}%)`
      );
    }
    let { data, error } = await query;
    return { data, error };
  }
  async delete(id: number) {
    let query = this.supabase
      .from<Medico>("Medico")
      .update({ estado: false })
      .eq("idMedico", id);
    return query;
  }
}
