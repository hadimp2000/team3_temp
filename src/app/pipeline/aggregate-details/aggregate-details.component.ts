import {Component, Input, OnInit} from '@angular/core';
import {AggregateDetailsModel} from "./aggregate-details.model";

@Component({
  selector: 'app-aggregate-details',
  templateUrl: './aggregate-details.component.html',
  styleUrls: ['./aggregate-details.component.scss']
})
export class AggregateDetailsComponent implements OnInit {
  @Input() aggregate_details: AggregateDetailsModel={
    column:'',
    operation:'',
    outputName:'',
    groupColumns:['']
  };
  public aggregateName:string='aggregate1';
  public columns: string[] = ['location', 'code', 'date', 'total cases'];

  constructor() {
  }

  ngOnInit(): void {
  }

  public addGroup() {
    this.aggregate_details.groupColumns?.push('');
  }

  public save(formValues:any){
    console.log(formValues)
  }

}
