import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Veichule, VeichuleService } from '../services/veichule.service';
import { EditVeichuleDialog } from './edit-veichule-dialog.component';
import { AddVeichuleDialog } from './add-veichule-dialog.component';

@Component({
  selector: 'app-veichule',
  templateUrl: './veichule.component.html',
  styleUrls: ['./veichule.component.scss']
})
export class VeichuleComponent implements OnInit {
  veichules!: MatTableDataSource<Veichule>;
  displayedColumns: string[] = ['id_vehicule', 'marque', 'modele', 'prixparjour','type','available','actions'];

  constructor(private veichuleService: VeichuleService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadVeichules();
  }

  loadVeichules(): void {
    this.veichuleService.getVeichules().subscribe(data => {
      this.veichules = new MatTableDataSource(data);
      this.veichules.data.forEach(vehicle => {
        if (vehicle.available) {
            vehicle.available = 'available';
            vehicle.av=true
        } else {
            vehicle.available = 'not available';
            vehicle.av=false
        }
      });
      console.log(this.veichules.data)
    });
  }

  deleteVeichule(id: string): void {
    this.veichuleService.deleteVeichule(id).subscribe(() => {
      this.loadVeichules();
    });
  }

  editVeichule(veichule: Veichule): void {
    // Open a dialog to edit veichule details
    const dialogRef = this.dialog.open(EditVeichuleDialog, {
      width: '250px',
      data: veichule
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.veichuleService.updateVeichule(result).subscribe(() => {
          this.loadVeichules();
        });
      }
    });
  }

  addVeichule(): void {
     // Open a dialog to edit veichule details
     const dialogRef = this.dialog.open(AddVeichuleDialog, {
      width: '250px',
      data: { marque: '', modele: '', etat: '',prixparjour:'' } as unknown as Veichule
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.veichuleService.addVeichule(result).subscribe(() => {
          this.loadVeichules();
        });
      }
    });
  }
}
