import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { Paciente } from "src/app/models/Paciente";
import { SupabaseService } from "../supabase.service";

@Injectable({
  providedIn: "root",
})
export class ChartService {
  supabase: SupabaseClient;

  constructor(private supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getSupabaseClient();
  }
  async getCantPacientes(primerDia : string,ultimoDia : String){
    return await this.supabase
    .from("Paciente")
    .select("idPaciente", { count: 'exact'})
    .eq("estado", true)
    .gt('fechaIngreso',primerDia)
    .lte('fechaIngreso',ultimoDia);

  }
  async getCantAtenciones(primerDia : string,ultimoDia : String){
    return await this.supabase
    .from("Atencion")
    .select("idAtencion", { count: 'exact'})
    .eq("estado", true)
    .gt('fechaRegistro',primerDia)
    .lte('fechaRegistro',ultimoDia);

  }

}
