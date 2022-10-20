import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  supabase: SupabaseClient;
  private cliente = new BehaviorSubject<Cliente>({} as Cliente);
  public getcliente(): Observable<Cliente> {
    return this.cliente.asObservable();
  }
  public setCliente(nuevoCliente: Cliente){
    return this.cliente.next(nuevoCliente);
    
  }
  constructor(    private supabaseService: SupabaseService) {
    this.supabase = supabaseService.getSupabaseClient();
  }
  async insert(cliente: Cliente) {
    let request = await this.supabase
    .from<Cliente>("Cliente")
    .insert({
      correo: cliente.correo,
      CUIT : cliente.CUIT,
      domicilio : cliente.domicilio,
      nombre : cliente.nombre,
      tipoPersona : cliente.tipoPersona,
      telefono : cliente.telefono
      
    }).single();
    if(request.data){
      if(cliente.tipoPersona == 'fisica'){
        let idCliente = request.data.idCliente;
        let req = await this.supabase
        .from<Cliente>("Cliente")
        .update({
          apellido : cliente.apellido,
          fechaNacimiento : cliente.fechaNacimiento,
          dniCliente : cliente.dniCliente
        })
        .eq('idCliente',idCliente)
        .single();
      }
    }
  }
  async update(cliente: Cliente){
    if(cliente.tipoPersona == 'fisica'){
      let req = await this.supabase
      .from<Cliente>("Cliente")
      .update({
        apellido : cliente.apellido,
        fechaNacimiento : cliente.fechaNacimiento,
        dniCliente : cliente.dniCliente
      })
      .eq('idCliente',cliente.idCliente)
      .single();
    }
    let req = await this.supabase
    .from<Cliente>("Cliente")
    .update({
      correo: cliente.correo,
      CUIT : cliente.CUIT,
      domicilio : cliente.domicilio,
      nombre : cliente.nombre,
      tipoPersona : cliente.tipoPersona,
      telefono : cliente.telefono
    })
    .eq('idCliente',cliente.idCliente)
    .single();
  }

  async getCantClientes(){
    return await this.supabase
      .from("Cliente").select("idCliente").eq('estado', true);
  }

  async getClientes(params?: LazyLoadEvent) {
    let query = this.supabase.from<Cliente>("Cliente").select("*").eq("estado",true).order('idCliente',{ascending: false});

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
        `or(nombre.ilike.%${params.globalFilter}%,apellido.ilike.%${params.globalFilter}%,CUIT.ilike.%${params.globalFilter}%,tipoPersona.ilike.%${params.globalFilter}%)`
      );
    }
    let { data, error } = await query;
    return { data, error };
  }
   async delete(id: number){
    let query = this.supabase.from<Cliente>("Cliente").update({estado:false}).eq("idCliente",id);
    return query;
   }
}
