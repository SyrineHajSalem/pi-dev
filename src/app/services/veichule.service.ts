import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Veichule {
  av: any;
  _id: any;
  id_vehicule: string;
  marque: string;
  modele: string;
  etats: any;
  type:any,
  prixparjour:any,
  available:any

}

@Injectable({
  providedIn: 'root'
})
export class VeichuleService {
  private apiUrl = 'http://localhost:5000/vehicules'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getVeichules(): Observable<Veichule[]> {
    return this.http.get<Veichule[]>(`${this.apiUrl}/vehicules`);
  }

  deleteVeichule(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateVeichule(veichule: Veichule): Observable<Veichule> {
    return this.http.put<Veichule>(`${this.apiUrl}/${veichule._id}`, veichule);
  }
  addVeichule(veichule: Veichule): Observable<Veichule> {
    return this.http.post<Veichule>(`${this.apiUrl}/addVehicule`, veichule);
  }
}
