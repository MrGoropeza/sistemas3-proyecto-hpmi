import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ArticuloDeDepositoService {

  constructor(private supabase : SupabaseService) { }

  public getArticulos(){
    
  }
}
