import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // @Output - decorator that allows us to expose data/field from this class/service to other components/classes.
  //
  @Output() hasToken: EventEmitter<boolean> = new EventEmitter();


  constructor() {
    if(localStorage.getItem('token') !== null){
      this.hasToken.emit(true);
    } else {
      this.hasToken.emit(false);
    }
   }


//gets toekn from localStorage
getToken(): string {
  return localStorage.getItem('token')!;
}

// gets the email of the user from the localStorage
getEmail(): string {
  return localStorage.getItem('email')!;
}


// gets the isAdmin from the localStorage, Uses an operator to convert the string to boolean
getIsAdmin(): boolean{
  return localStorage.getItem('isAdmin')! === 'true';
}

//sets token into the localStorage
setToken(value: string): void{
  this.hasToken.emit(true);
  localStorage.setItem('token', value);
}

//sets email into localStorage
setEmail(value: string): void {
  localStorage.setItem('email', value);
}

//set isAdmin into localStorage
setIsAdmin(value: string): void {
  localStorage.setItem('isAdmin', value);
}

//clear() - will logout our users
//.clear() - to clear out the contents of our browser's localStorage
clear(): void {
  localStorage.clear();
  this.hasToken.emit(false);
}

// Note: localStorage is a container of values/data within our browser.
// These values are stored like key-value pairs.
// localStorage.setItem('keyName', value) - this will set a key value pair in the browser's localStorage
// localStorage.getItem('keyName') - returns the value of the given key.

}
