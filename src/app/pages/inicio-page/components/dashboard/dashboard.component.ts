import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/services/charts/chart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cantPacientes : number = 0;
  constructor(private chartService : ChartService) { }

  ngOnInit(): void {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const primerDia = firstDay.toISOString();
    const ultimoDia = lastDay.toISOString();
    this.getCantPacientes(primerDia,ultimoDia);
  }
  async getCantPacientes(primerDia : string,ultimoDia : string){
    let request = await this.chartService.getCantPacientes(primerDia,ultimoDia);
    if(request.data){
      console.log(request.data);
      this.cantPacientes = request.data.length;
      
    }else{
      console.log(request.error);
    }
  }
  getCantAtenciones(){

  }

}
