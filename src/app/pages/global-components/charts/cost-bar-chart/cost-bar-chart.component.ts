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
  @Input() color1! : string;
  @Input() color2! : string;
  @Input() labels : string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.getGastos();
  }
  private async getGastos() {
    this.data = {
      labels: this.labels,
      datasets: [
        {
          label: this.etiqueta1,
          backgroundColor: this.color1,
          data: this.vector1,
        },
        {
          label: this.etiqueta2,
          backgroundColor: this.color2,
          data: this.vector2,
        },
      ],
    };
  }
}
