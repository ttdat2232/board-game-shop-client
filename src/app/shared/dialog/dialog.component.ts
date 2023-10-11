import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: 'app-dialog',
    standalone: true,
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    imports: [CommonModule, MatCardModule, MatDialogModule, ButtonComponent]
})
export class DialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData = new DialogData(),
        public dialogRef: MatDialogRef<DialogComponent>
    ) {}
}

export class DialogData {
    constructor(
        public title: string = "Title",
        public content: string = "Content",
        public agreeBtnName?: string,
        public disagreeBtnName?: string,
    ) {}
}