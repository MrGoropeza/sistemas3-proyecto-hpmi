import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseService } from "../supabase.service";

@Injectable({
  providedIn: "root",
})
export class ChartService {
  supabase: SupabaseClient;

  constructor(private supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getSupabaseClient();
  }
  
}
