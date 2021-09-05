import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aggregate-details',
  templateUrl: './aggregate-details.component.html',
  styleUrls: ['./aggregate-details.component.scss']
})
export class AggregateDetailsComponent implements OnInit {
  public aggregateName:string='aggregate1';

  constructor() { }

  ngOnInit(): void {
  }

}
