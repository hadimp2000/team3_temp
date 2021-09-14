import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {FilterDetailsModel} from "../filter-details.model";
import {DataSetServiceService} from "../../../services/data-set-service.service";
import {BoardService} from "../../service/board.service";


@Component({
  selector: 'app-filter-details',
  templateUrl: './filter-details.component.html',
  styleUrls: ['./filter-details.component.scss']
})
export class FilterDetailsComponent implements OnInit, OnChanges {
  @Input() filter_details!: FilterDetailsModel;
  @Output() filter_changes: EventEmitter<FilterDetailsModel> = new EventEmitter<FilterDetailsModel>();
  public dataset!: Array<string>[];
  public operation!: string;
  public temp: boolean = true;
  public value!: string;
  public column!: string;
  public columns: string[] = [];
  public operations: string[] = ['='];

  constructor(private dataSetServiceService: DataSetServiceService, private boardService: BoardService) {
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.dataset = await this.dataSetServiceService.getCsvDataSet("" + this.boardService.sourceName)
    // @ts-ignore
    this.columns = this.dataset[0];
    this.operations = ['='];
    if (this.filter_details.column !== "") {
      const input = this.filter_details.column;
      const index = this.dataset[0].indexOf(input);
      const value = this.dataset[1][index];
      if (!isNaN(+Number(value)) || !isNaN(Date.parse(value))) {
        this.operations.push(">", "<");
      } else
        this.operations = ["="]
    }
  }

  async ngOnInit() {

  }

  public checkOperations(event: any) {
    const input = event.target.value;
    const index = this.dataset[0].indexOf(input);
    const value = this.dataset[1][index];
    if (!isNaN(+Number(value))) {
      this.operations.push(">", "<");
    } else
      this.operations = ["="]
  }

  public saveFilter(formValues: any) {
    let fixedOperation='=';
    switch (formValues.operation) {
      case '=':
        fixedOperation = '=';
        break
      case '>':
        fixedOperation = '<';
        break
      case '<':
        fixedOperation = '>';
        break
    }
    this.filter_changes.emit(
      {
        showForm: false,
        id: this.filter_details.id,
        column: formValues.column,
        operation: fixedOperation,
        value: formValues.value
      }
    )
  }

}
