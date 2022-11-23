import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Course } from '@models/course';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl: string = environment.apiUrl + '/courses';
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + this.sessionService.getToken()
  })

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

    // get() method to retrieve our courses
    get(): Observable<Course[]>{
      return this.http.get<Course[]>(this.baseUrl);
    }

    addingCourse(course: Course): Observable<Object> { 
      return this.http.post(this.baseUrl , course, {headers: this.httpHeaders});
    }

}
