import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn } from '@angular/forms';
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
    if(this.selectionMode === "range"){this.control.addValidators(this.hasRangeValidator())};
  }

  hasRangeValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        if(!control.value) return {invalidRange: true};
        if(control.value[1] === null) return {invalidRange: true};
        return null;
    };
  }
  
}

