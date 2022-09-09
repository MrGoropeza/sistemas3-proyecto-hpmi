import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boton-navegacion',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.css']
})
export class BotonComponent implements OnInit {

  @Input() routerLink!: string;
  @Input() icon!: string;
  @Input() label!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
