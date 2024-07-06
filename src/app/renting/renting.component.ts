
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Rent, RentService } from '../services/rent.service';
import { Conditional } from '@angular/compiler';

@Component({
  selector: 'app-renting',
  templateUrl: './renting.component.html',
  styleUrls: ['./renting.component.scss']
})
export class RentingComponent implements OnInit {
  reservations!: MatTableDataSource<Rent>;
  displayedColumns: string[] = ['id_vehicule', 'id_client', 'dateDebut', 'dateFin', 'tarif', 'paid', 'actions'];

  constructor(private rentingService: RentService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.rentingService.getReservations().subscribe(data => {
      this.reservations = new MatTableDataSource(data);
      console.log(this.reservations.data)
    });
  }

  deleteReservation(id: string): void {
    this.rentingService.deleteReservation(id).subscribe(() => {
      this.loadReservations();
    });
  }
}

