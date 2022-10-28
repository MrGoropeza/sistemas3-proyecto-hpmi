import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cost-bar-chart",
  templateUrl: "./cost-bar-chart.component.html",
  styleUrls: ["./cost-bar-chart.component.css"],
})
export class CostBarChartComponent implements OnInit {
  data: any;
  constructor() {
    this.data = {
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
      datasets: [
        {
          label: "Total a Pagar",
          backgroundColor : "#73c8c0",
          data: [65, 59, 80, 81],
        },
        {
          label: "Saldo Deudor",
          backgroundColor : "#009ea0",
          data: [28, 48, 40, 19],
        },
      ],

    };
  }

  ngOnInit(): void {}
}
