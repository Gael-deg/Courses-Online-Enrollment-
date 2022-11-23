import { Component, OnInit } from '@angular/core';
import { Course } from '@models/course';
import { CourseService } from '@services/course.service';
import { Router } from '@angular/router';
import { SessionService } from '@services/session.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];

  isAdmin: boolean = false;
  hasToken: boolean = (localStorage.getItem('token') !== null);

  constructor(
    private courseService: CourseService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.getCourses();
    this.isAdmin = sessionService.getIsAdmin();
   }

  ngOnInit(): void {
  }

  // getCourse
  getCourses(){
    this.courseService.get().subscribe((response: Course[]) => {
      // console.log(response);
      // courses field in Courses page should now contain the array of courses from our DB
      this.courses = response;
    })
  }

}
