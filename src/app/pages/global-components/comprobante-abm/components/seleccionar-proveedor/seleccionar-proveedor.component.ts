import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Proveedor } from 'src/app/models/Proveedor';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';

@Component({
  selector: 'app-seleccionar-proveedor',
  templateUrl: './seleccionar-proveedor.component.html',
  styleUrls: ['./seleccionar-proveedor.component.css']
})
export class SeleccionarProveedorComponent implements OnInit {

  cargando: boolean = false;
  proveedores!: Proveedor[];
  @Output() proveedorSeleccionado = new EventEmitter<Proveedor>;
  cantTotalProveedores!: number;

  constructor(
    private proveedorService: ProveedorService
  ) { }

  ngOnInit(): void {
  }

  async onLazyLoad(event: LazyLoadEvent) {
    this.cargando = true;
    let requestCant = await this.proveedorService.getCantProveedores();
    if(requestCant.data){
      this.cantTotalProveedores= requestCant.data.length;
    }

    let request = await this.proveedorService.getProveedoresLazy(event);
    if(request.data){
      this.proveedores = request.data;
      this.cargando = false;
    }else{
      console.log(request.error);
    }
  }

  seleccionarProveedor(proveedor: Proveedor) {
    this.proveedorSeleccionado.emit(proveedor);
  }

}
