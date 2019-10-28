import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-decade-button',
  templateUrl: './decade-button.component.html',
  styleUrls: ['./decade-button.component.sass']
})
export class DecadeButtonComponent implements OnInit {
  @Input()
  decade: string;
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();
  buttonLabel: string;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
      this.setButtonLabel(this.decade);
  }

  setButtonLabel = (decade) => {
    const keyVal = `decadeBtn.button.${decade}`;
    this.translate.stream(keyVal).subscribe((value) => {
      this.buttonLabel = value;
    });
  }

  clickHandler() {
      this.change.emit(this.decade);
  }
}
