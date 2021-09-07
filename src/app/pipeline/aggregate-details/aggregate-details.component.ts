import {Component, Input, OnInit} from '@angular/core';
import {AggregateDetailsModel} from "./aggregate-details.model";
import {BoardService} from "../service/board.service";

@Component({
  selector: 'app-aggregate-details',
  templateUrl: './aggregate-details.component.html',
  styleUrls: ['./aggregate-details.component.scss']
})
export class AggregateDetailsComponent implements OnInit {
  @Input() aggregate_details!: AggregateDetailsModel;
  @Input() aggregateId!: string ;
  public columns: string[] = ['location', 'code', 'date', 'total cases'];

  constructor(private boardService:BoardService) {
  }

  ngOnInit(): void {
  }

  public addGroup() {
    this.aggregate_details.groupColumns?.push('');
  }

  public save(formValues:any){
    const {columns,operations,outputName, ...groupsObj} = formValues;
    const groupArray:string[]= Object.values(groupsObj);
    const data={
      name:'process-aggregate',
      column: formValues.columns,
      operation: formValues.operations,
      outputName: formValues.outputName,
      groupColumns:groupArray
    }
    this.boardService.changeNodeData(this.aggregateId,data);
  }

}
