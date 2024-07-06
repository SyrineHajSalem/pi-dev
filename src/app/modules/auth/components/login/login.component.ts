import { UsersService } from 'src/app/core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

class Login {
  email: any;
  password: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login = new Login();
  constructor(
    private usersService: UsersService,
    private router : Router
  ) {}

  ngOnInit(): void {}

  loginService() {
    this.usersService.login(this.login).subscribe((res: any) => {
      console.log(res);

      if(res.role == 'client'){
        this.router.navigateByUrl("/")
      }else if (res.role == "admin"){
        this.router.navigateByUrl("admin")
      }
    });
  }
}
