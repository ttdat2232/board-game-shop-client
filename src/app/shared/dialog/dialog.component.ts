import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
@Component({
    selector: 'app-dialog',
    standalone: true,
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    imports: [CommonModule, MatCardModule],
})
export class DialogComponent {
}
