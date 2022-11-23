import { Component, OnInit } from '@angular/core';
import { Course } from '@models/course';
import { CourseService } from '@services/course.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  name: string = '';
  description: string = '';
  price: string = '';

  private course: Course = new Course();

  constructor(
    private courseService: CourseService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void{ 
    this.course.name = this.name,
    this.course.description = this.description,
    this.course.price = this.price

    this.courseService.addingCourse(this.course).subscribe({
      next: this.successfulAddedCourse.bind(this),
      error: this.failedAddedCourse.bind(this)
    });   
  }

  successfulAddedCourse(response: Record<string, any>){
    Swal.fire('New Course Added', 'You have successfully add new course','success');
    this.router.navigate(['courses']);
  }

  failedAddedCourse(result: Record<string, any>){

    let data: Record<string, any> = result['error'];
    Swal.fire('Failed to Add Course', '','error');

  
  }
}
