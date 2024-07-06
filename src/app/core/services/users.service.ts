import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get('http://localhost:5000/user');
  }
  getAllUsersByGoub() {
    return this.http.get('http://localhost:5000/user/getNumberOfUsers/ByGouvernerat');
  }
  getAllUsersByGenre() {
    return this.http.get('http://localhost:5000/user/getNumberOfUsers/ByGenre');
  }
  getAllUsersByAge() {
    return this.http.get('http://localhost:5000/user/getNumberOfUsers/ByAge');
  }

  deleteUser(id: any) {
    return this.http.delete('http://localhost:5000/user/' + id);
  }

  updateUser(id: any, data: any) {
    return this.http.put('http://localhost:5000/user/' + id, data);
  }
  addUser(data: any) {
    return this.http.post('http://localhost:5000/user', data);
  }
  login(data: any) {
    return this.http.post('http://localhost:5000/user/login', data);
  }
}
