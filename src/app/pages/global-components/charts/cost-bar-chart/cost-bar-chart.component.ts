import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-cost-bar-chart",
  templateUrl: "./cost-bar-chart.component.html",
  styleUrls: ["./cost-bar-chart.component.css"],
})
export class CostBarChartComponent implements OnInit {
  data: any;
  @Input() vector1 : number[] = [];
  @Input() vector2 : number[] = [];
  @Input() titulo! : string;
  @Input() etiqueta1! : string;
  @Input() etiqueta2! : string;
  constructor() {}

  ngOnInit(): void {
    this.getGastos();
  }
  private async getGastos() {
    this.data = {
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
      datasets: [
        {
          label: this.etiqueta1,
          backgroundColor: "#73c8c0",
          data: this.vector1,
        },
        {
          label: this.etiqueta2,
          backgroundColor: "#009ea0",
          data: this.vector2,
        },
      ],
    };
  }
}
