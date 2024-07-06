import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Veichule } from '../services/veichule.service';

@Component({
  selector: 'edit-veichule-dialog',
  templateUrl: 'edit-veichule-dialog.component.html',
})
export class EditVeichuleDialog {
  constructor(
    public dialogRef: MatDialogRef<EditVeichuleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Veichule
  ) {}

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
