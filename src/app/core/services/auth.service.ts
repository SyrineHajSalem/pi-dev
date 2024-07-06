import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient
  ) { }

  loginService(){
    return this.http.get("http://localhost:8081/users/getAll")
  }

  registerService(data : any){
    return this.http.post("http://localhost:8081/users/register" , data)
  }
}
