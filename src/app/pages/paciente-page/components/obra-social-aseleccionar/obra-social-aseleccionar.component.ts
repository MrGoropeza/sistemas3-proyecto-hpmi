import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ObraSocial } from 'src/app/models/ObraSocial';
import { ObraSocialService } from 'src/app/services/obraSociales/obra-social.service';

@Component({
  selector: 'app-obra-social-aseleccionar',
  templateUrl: './obra-social-aseleccionar.component.html',
  styleUrls: ['./obra-social-aseleccionar.component.css']
})
export class ObraSocialASeleccionarComponent implements OnInit {
  items: ObraSocial[] = [];
  cant: Number = 0;
  total!: number;
  loading!: boolean;
  constructor(
    public ref: DynamicDialogRef,
    private obraSocialService : ObraSocialService
  ) { }

  ngOnInit(): void {
    this.getItems();
  }
  public async onLazyLoad(event: LazyLoadEvent) {
    this.loading = true;
    let requestCant = await this.obraSocialService.getCant();
    if (requestCant.data) {
      this.total = requestCant.data.length;
    }
    let request = await this.obraSocialService.getItems(event);
    if (request.data) {
      this.items = request.data;
      this.cant = this.items.length;
      this.loading = false;
    } else {
      console.log(request.error);
    }
}
public async getItems(): Promise<void> {
  let request = await this.obraSocialService.getItems();
  if (request.data) {
    this.items = request.data;
    console.log(this.items);  
    this.total = this.items.length;
    this.loading = false;
  } else {
    console.log(request.error);
  }
}
public seleccionar(item : ObraSocial){
  this.ref.close(item);
}

}
