import { Component, OnInit } from '@angular/core';
import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
 
  private user: User = new User();
  
  constructor(
     
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void{ 
    this.user.firstName = this.firstName,
    this.user.lastName = this.lastName,
    this.user.email = this.email,
    this.user.password = this.password
    
    this.userService.register(this.user).subscribe({
      next: this.successfulRegister.bind(this),
      error: this.errorRegister.bind(this)
    });   
  }

  successfulRegister(response: Record<string, any>){
    Swal.fire('Registration Successful', 'You are now login using your new account','success');
    this.router.navigate(['login']);
  }

  errorRegister(result: Record<string, any>){

    let data: Record<string, any> = result['error'];
    Swal.fire('Registration Failed', '','error');

    // if(data == null){
    //   Swal.fire('Registration Failed', 'You have to fill up all fields, please try again','error');
    // }

  }

}
