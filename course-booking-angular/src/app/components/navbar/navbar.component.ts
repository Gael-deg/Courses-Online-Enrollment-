import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@services/session.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  hasToken: boolean = (localStorage.getItem('token') !== null);
  email: string = localStorage.getItem('email')!;

  constructor(
    private sessionService: SessionService,
    private router: Router
    ) {

        // All hasToken (event emitter from session service) 
        // subcribe method will be run when .emit() is used to update the vent emitter      

        sessionService.hasToken.subscribe(hasTokenEventEmitter => {
          // console.log('I am run whenever an emit() method of an EvenEmitter is run. hasToken is an EventEmitter.');
          console.log(hasTokenEventEmitter);
          this.hasToken = hasTokenEventEmitter;

          // whenever we login or logout, we will get the email of our user from the localStorage and update that to our
          // email variable in the navbar components
          this.email = this.sessionService.getEmail();

        })

     }

  ngOnInit(): void {

  }

      logout(): void {
        //console.log('Logout button has been clicked');
        this.sessionService.clear();
        this.router.navigate(['/login'])
      }

}
