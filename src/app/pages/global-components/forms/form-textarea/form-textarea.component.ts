import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.css']
})
export class FormTextareaComponent implements OnInit {

  @Input() id!: string;
  @Input() label!: string;
  @Input() labelError!: string;
  @Input() control!: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
