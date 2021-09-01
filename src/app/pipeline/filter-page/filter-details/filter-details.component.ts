import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-details',
  templateUrl: './filter-details.component.html',
  styleUrls: ['./filter-details.component.scss']
})
export class FilterDetailsComponent implements OnInit {
  public filter_name:string='filter1';
  constructor() { }

  ngOnInit(): void {
  }

}
