import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class ButtonComponent {
  @Input() btnName!: string | "button Name";
  @Input() color!: string | "primary";
  @Output() clickEvent: EventEmitter<boolean> = new EventEmitter();

  onClick() {
    this.clickEvent.emit(true);
  }
}
