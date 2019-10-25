import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-decade-button',
  templateUrl: './decade-button.component.html',
  styleUrls: ['./decade-button.component.sass']
})
export class DecadeButtonComponent implements OnInit {
  @Input('lbl')
  label: string;
  @Input()
  decade: string;
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  clickHandler() {
      this.change.emit(this.decade);
  }
}
