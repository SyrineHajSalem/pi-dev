import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Veichule } from '../services/veichule.service';
@Component({
  selector: 'add-veichule-dialog',
  templateUrl: 'add-veichule-dialog.component.html',
})
export class AddVeichuleDialog {
  constructor(
    public dialogRef: MatDialogRef<AddVeichuleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Veichule
  ) {}

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
