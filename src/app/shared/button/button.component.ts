import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: [
    './button.component.scss',
    '../../../../node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css',
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [MatButtonModule, MatTooltipModule],
})
export class ButtonComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisable'])
      this.isDisable = changes['isDisable'].currentValue;
    if (changes['btnName'])
      this.btnName = changes['btnName'].currentValue;
  }
  @Input() btnName!: string | "button Name";
  @Input() tooltipContent?: string; 
  @Input() isDisable: boolean = false;
  @Output() clickEvent: EventEmitter<boolean> = new EventEmitter();

  onClick() {
    this.clickEvent.emit(true);
  }
}
