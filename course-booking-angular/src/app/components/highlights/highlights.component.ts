import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css']
})
export class HighlightsComponent implements OnInit {
// The Record type used to define variables with objects that are not declared based om models in the application.

  data: Record<string, string>[] = [
    {
      'title': 'Learn from Home',
      'description': 'This is a sample description for the Learn from Home.'
    },

    {
      'title': 'Study Now, Pay Later',
      'description': 'This is a sample description for the Study Now, Pay Later.'
    },

    {
      'title': 'Be Part of Our Community',
      'description': 'This is a sample description for the Be Part of Our Community.'
    }

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
