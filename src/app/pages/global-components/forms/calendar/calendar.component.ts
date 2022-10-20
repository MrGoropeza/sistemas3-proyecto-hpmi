import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { LocaleService } from 'src/app/services/locale.service';

@Component({
  selector: 'app-form-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() id!: string;
  @Input() label!: string;
  @Input() labelError!: string;
  @Input() control!: FormControl;
  @Input() selectionMode: string = "single";

  constructor(
    
  ) { }

  ngOnInit(): void {
    
  }

}
