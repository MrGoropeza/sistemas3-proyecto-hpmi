import { Component, Input, OnInit } from "@angular/core";
import { ChartService } from "src/app/services/charts/chart.service";

@Component({
  selector: "app-cost-bar-chart",
  templateUrl: "./cost-bar-chart.component.html",
  styleUrls: ["./cost-bar-chart.component.css"],
})
export class CostBarChartComponent implements OnInit {
  data: any;
  @Input() gastos : number[] = [];
  @Input() devengamientos : number[] = [];
  constructor() {}

  ngOnInit(): void {
    this.getGastos();
  }
  private async getGastos() {
    this.data = {
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
      datasets: [
        {
          label: "Devengamientos",
          backgroundColor: "#73c8c0",
          data: this.devengamientos,
        },
        {
          label: "Gastos",
          backgroundColor: "#009ea0",
          data: this.gastos,
        },
      ],
    };
  }
}
