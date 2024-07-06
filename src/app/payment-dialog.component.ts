import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent {
  paymentForm: FormGroup;
  price: number;

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.price = data.price;
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      expirationDate: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])\/?([0-9]{2})')]],
      cvc: ['', [Validators.required, Validators.pattern('[0-9]{3,4}')]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      // Process payment
      this.dialogRef.close(this.paymentForm.value);
    }
  }
}
