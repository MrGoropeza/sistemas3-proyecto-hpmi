import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  constructor(
    private supabase : SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  ) { }
}
