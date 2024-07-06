import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AcceuilRoutingModule } from './acceuil-routing.module';
import { AcceuilComponent } from './acceuil.component';
import { GoogleMapsComponent } from 'src/app/google-maps/google-maps.component';
import { RentComponent } from 'src/app/rent/rent.component';
import { PaymentDialogComponent } from 'src/app/payment-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AcceuilComponent,
    GoogleMapsComponent,
    RentComponent,
    PaymentDialogComponent
  ],
  imports: [
    CommonModule,
    AcceuilRoutingModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule
  ]
})
export class AcceuilModule { }
