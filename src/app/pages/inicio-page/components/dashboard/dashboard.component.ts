import { Component, OnInit } from "@angular/core";
import { ChartService } from "src/app/services/charts/chart.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  cantPacientes!: number;
  gastos: number[] = [];
  devengamientos: number[] = [];
  obraSociales: number[] = [];
  entrada: number[] = [];
  cantAtenciones!: number;
  graficosCargados: number = 0;
  band! : boolean;
  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const primerDia = firstDay.toISOString();
    const ultimoDia = lastDay.toISOString();
    this.getCantPacientes(primerDia, ultimoDia);
    this.getCantAtenciones(primerDia, ultimoDia);
    this.getObraSocial();
    this.getEntrada();
    this.getGastos();
    this.getSaldos();
  }
  private async getSaldos() {
    let request = await this.chartService.getSaldos();
    if (request.data) {
      this.gastos = request.data.map((dato) => dato.subtotal);
      this.band = true;
      this.graficosCargados++;
    }
  }
  private async getObraSocial() {
    let request = await this.chartService.getObraSocial();
    if (request.data) {
      this.obraSociales = request.data.map((dato) => dato.subtotal);
      console.log(this.obraSociales);
      
      this.graficosCargados++;
    }
  }
  private async getEntrada() {
    let request = await this.chartService.getEntrada();
    if (request.data) {
      this.entrada = request.data.map((dato) => dato.subtotal);

      this.graficosCargados++;
    }
  }
  private async getGastos() {
    let request = await this.chartService.getGastos();
    if (request.data) {
      this.devengamientos = request.data.map((dato) => dato.subtotal);
      this.graficosCargados++;
    }
  }
  async getCantPacientes(primerDia: string, ultimoDia: string) {
    let request = await this.chartService.getCantPacientes(
      primerDia,
      ultimoDia
    );
    if (request.data) {
      this.cantPacientes = request.data.length;
      this.graficosCargados++;
    } else {
      console.log(request.error);
    }
  }
  async getCantAtenciones(primerDia: string, ultimoDia: string) {
    let request = await this.chartService.getCantAtenciones(
      primerDia,
      ultimoDia
    );
    if (request.data) {
      this.cantAtenciones = request.data.length;
      this.graficosCargados++;
    } else {
      console.log(request.error);
    }
  }
}
