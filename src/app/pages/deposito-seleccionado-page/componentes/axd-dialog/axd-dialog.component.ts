import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-axd-dialog',
  templateUrl: './axd-dialog.component.html',
  styleUrls: ['./axd-dialog.component.css']
})
export class AxdDialogComponent implements OnInit {

  @Input() dialog!: boolean;
  @Output() dialogChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {

  }

  ocultarDialog(){
    this.dialog = false;
    this.dialogChange.emit(false);
  }

}
