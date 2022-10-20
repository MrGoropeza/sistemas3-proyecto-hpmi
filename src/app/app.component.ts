import { Component, OnInit } from '@angular/core';
import { LocaleService } from './services/locale.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sistemas3-proyecto-hpmi';

  constructor(
    private localeService: LocaleService
  ){
    
  }

  ngOnInit(): void {
    this.localeService.setEspaniol();
    
  }
}
