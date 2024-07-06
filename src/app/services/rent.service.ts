import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Rent {
  _id: any;
  tarif: any;
  dateDebut: Date,
  dateFin: Date,
  type:any,
  id_client:any,
  paid:any,
  id_vehicule:any
}
export interface Payment {
  amount: Number,
  id_rent:any
}

@Injectable({
  providedIn: 'root'
})
export class RentService {
  private apiUrl = 'http://localhost:5000'; // backend API URL

  constructor(private http: HttpClient) {}

  Renting(rent: Rent): Observable<Rent> {
    return this.http.post<Rent>(`${this.apiUrl}/reservations/addReservations`, rent);
  }
  payment(payment:Payment):Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/payments/process-payment`, payment);
  }
  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reservations/${id}`);
  }
  getReservations(): Observable<Rent[]> {
    return this.http.get<Rent[]>(`${this.apiUrl}/reservations/reservations`);
  }
}
