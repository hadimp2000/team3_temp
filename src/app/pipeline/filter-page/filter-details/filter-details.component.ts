import {Component, EventEmitter, Input, OnInit,OnChanges, Output, SimpleChanges} from '@angular/core';
import {FilterDetailsModel} from "../filter-details.model";

@Component({
  selector: 'app-filter-details',
  templateUrl: './filter-details.component.html',
  styleUrls: ['./filter-details.component.scss']
})
export class FilterDetailsComponent implements OnInit, OnChanges {
  @Input() filter_details!: FilterDetailsModel;
  @Output() filter_changes: EventEmitter<FilterDetailsModel> = new EventEmitter<FilterDetailsModel>();
  public operation!: string;
  public value!: string;
  public column!: string;
  public columns: string[] = ['location', 'code', 'date', 'total cases'];
  public operations: string[] = ['=', '<', '>'];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
          console.log(changes.filter_details.currentValue)

    }

  ngOnInit(): void {
  }

  public saveFilter(formValues: any){
    this.filter_changes.emit(
      {
        showForm:false,
        id: this.filter_details.id,
        column: formValues.column,
        operation: formValues.operation,
        value: formValues.value
      }
    )
  }

}
