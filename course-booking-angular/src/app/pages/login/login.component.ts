import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.userService.login(this.email, this.password).subscribe({
      next: this.successfullLogin.bind(this),
      error: this.failedLogin.bind(this)
    });
  }

  successfullLogin(response: Record<string, any>){
    //console.log(response);
    Swal.fire('Login successful', 'You are now login!','success');
    this.sessionService.setEmail(response['email']);
    this.sessionService.setIsAdmin(response['isAdmin']);
    this.sessionService.setToken(response['token']);

    this.router.navigate(['']);
  }

  failedLogin(result: Record<string, any>){
    let data: Record<string, any> = result['error'];

    if(data['result'] === 'incorrect_credentials'){
      Swal.fire('Login Failed', 'You have entered incorrect credentials, please try again','error');
    } else if(data['result'] === 'user_not_found'){
      Swal.fire('Login Failed', 'User does not exist, please try again','error');
    }
  }

}
