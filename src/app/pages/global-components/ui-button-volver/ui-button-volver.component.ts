import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-button-volver',
  templateUrl: './ui-button-volver.component.html',
  styleUrls: ['./ui-button-volver.component.css']
})
export class UiButtonVolverComponent implements OnInit {

  @Input() routerLink: any[];

  constructor() {
    this.routerLink = ['..'];
  }

  ngOnInit(): void {
  }

}
