import { Component, OnInit } from '@angular/core';
import { RouteInfo } from '../google-maps/maps-route.model';
import { RentService } from '../services/rent.service';
import { PaymentDialogComponent } from '../payment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AnimationQueryMetadata } from '@angular/animations';
interface IconUrls {
  [key: string]: string; // Index signature for string keys with string values
}
@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss'],
})
export class RentComponent implements OnInit {
  routeInfos: RouteInfo[] = [];
  property={
    coordinatesLat:36.884453 ,
    coordinatesLng:10.220660
  }
  dateDebut!:Date;
  dateFin!:Date;
  type:any
  price:any
  email:any
  id_rent: any;
  constructor(private rentService:RentService, public dialog: MatDialog) { }
  iconUrls: IconUrls = {
    'DRIVING': '../../assets/driving.svg',
    'TRANSIT': '../../assets/walking.svg', 
  };
  ngOnInit(): void {
  }
  onRouteInfoReady(routeInfos: RouteInfo[]): void {
    this.routeInfos = routeInfos;
    console.log('Received route information:', this.routeInfos);
  }

  rent(){
    console.log('renting')
    const data={
      tarif:0,
      dateDebut:this.dateDebut ,
      dateFin:this.dateFin ,
      type:this.type,
      id_client:this.email,
      paid:false,
      id_vehicule:'',
      _id:Object
    }
    this.rentService.Renting(data).subscribe({
      next: (responseData) => {
        console.log('Received data:', responseData); // Log the received data
        this.price = responseData.tarif;
        this.id_rent=responseData._id // Update component property
      },
      error: (error) => {
        console.error('Error occurred:', error); // Handle errors if any
      },
      complete: () => {
        console.log('Subscription completed'); // Handle completion
        // Additional logic after subscription completes
        console.log(this.price)
        this.openPaymentDialog()
      }
    });
  }

  openPaymentDialog(): void {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '300px',
      data: { price: this.price }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed with payment data', result);
        const data={
          amount:this.price,
          currency: "usd",
      payment_method: "pm_card_visa",
      token:result.cardNumber,
      id_rent:this.id_rent
        }
        this.rentService.payment(data).subscribe({
          next: (responseData) => {
            console.log('Received data:', responseData); // Log the received data
          },
          error: (error) => {
            console.error('Error occurred:', error); // Handle errors if any
          },
          complete: () => {
            console.log('payment completed'); // Handle completion
            // Additional logic after subscription completes
          }
        });
      }
    });
  }
}
