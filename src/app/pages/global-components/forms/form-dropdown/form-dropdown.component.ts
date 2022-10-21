import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DropdownItem } from 'primeng/dropdown';

@Component({
  selector: 'app-form-dropdown',
  templateUrl: './form-dropdown.component.html',
  styleUrls: ['./form-dropdown.component.css']
})
export class FormDropdownComponent implements OnInit {

  @Input() id!: string;
  @Input() label!: string;
  @Input() labelError!: string;
  @Input() control!: FormControl;

  @Input() options!: any[];
  @Input() optionLabel!: string;
  @Input() optionValue!: string;

  constructor() { }

  ngOnInit(): void {
    
  }

}
