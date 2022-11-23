import { Component, Input, OnInit } from '@angular/core';
import { Course } from '@models/course';
import { SessionService } from '@services/session.service';
import { UserService } from '@services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  // @Input is a decorator which allows us to receive from another components
  @Input() course!: Course;

  // When the course component is used or called
  // we will check if there is a token
  isAdmin: boolean = false;
  hasToken: boolean = (localStorage.getItem('token') !== null);

  constructor(
    private sessionService: SessionService,
    private userService: UserService
  ) { 
      this.isAdmin = sessionService.getIsAdmin();
  }

  ngOnInit(): void {
    //console.log(this.course);
  }

  enroll(){
    this.userService.enroll(this.course.id!).subscribe({
      next: this.successfulEnrollment.bind(this),
      error: this.failedEnrollment.bind(this)
    });
  }

  successfulEnrollment(response: Record<string, any>){
    Swal.fire('Enrollment Succesful', 'Enjoy the Course','success')
  }

  failedEnrollment(response: Record<string, any>){
    let data: Record<string, any> = response['error'];
    
    if(data['result'] === 'already_enrolled'){
      Swal.fire('Enrollment Cancelled', 'You are already enrolled in this course','error')
    }    
  }

}
