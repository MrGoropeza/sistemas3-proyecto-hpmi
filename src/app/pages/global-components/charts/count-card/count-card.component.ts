import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-card',
  templateUrl: './count-card.component.html',
  styleUrls: ['./count-card.component.css']
})
export class CountCardComponent implements OnInit {
  @Input() valor : number = 0;
  @Input() leyenda : string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
