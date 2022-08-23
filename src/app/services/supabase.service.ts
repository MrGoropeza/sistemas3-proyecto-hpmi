import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase : SupabaseClient 

  constructor(
    
  ) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }
}
