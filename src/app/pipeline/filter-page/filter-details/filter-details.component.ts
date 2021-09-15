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
export class FilterDetailsComponent implements OnChanges {
  @Input() filter_details!: FilterDetailsModel;
  @Output() filter_changes: EventEmitter<FilterDetailsModel> = new EventEmitter<FilterDetailsModel>();
  public dataset!: Array<string>[];
  public operation!: string;
  public temp: boolean = true;
  public value!: string;
  public column!: string;
  public columns: string[] = [];
  public operations: string[] = ['=','>','<'];

  constructor(private dataSetServiceService: DataSetServiceService, private boardService: BoardService) {
  }

  async ngOnChanges(changes: SimpleChanges) {
    // this.operations = ['='];
    const sourceType: string = await this.dataSetServiceService.csvOrSql("" + this.boardService.sourceName);
    if (sourceType === 'csv')
      this.dataset = await this.dataSetServiceService.getCsvDataSet("" + this.boardService.sourceName)
    else
      this.dataset = await this.dataSetServiceService.getSqlDataSet("" + this.boardService.sourceName)
    this.columns = this.dataset[0];
    // if (this.filter_details.column !== '') {
    //   this.createOperations(this.filter_details.column);
    // }
    this.filter_details.operation=this.fixOperation(this.filter_details.operation);
  }

  public checkOperations(event: any) {
    this.createOperations(event.target.value);
  }

  public saveFilter(formValues: any) {
    const fixedOperation = this.fixOperation(formValues.operation);
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

  public fixOperation(operation: string): string {
    let fixedOperation;
    switch (operation) {
      case '=':
        fixedOperation = '=';
        break
      case '>':
        fixedOperation = '<';
        break
      case '<':
        fixedOperation = '>';
        break
      default:
        fixedOperation='';
    }
    return fixedOperation;
  }

  public createOperations(input: string) {
    const index = this.dataset[0].indexOf(input);
    const value = this.dataset[1][index];
    if (!isNaN(+Number(value))) {
      this.operations = ['=', '>', '<'];
    } else
      this.operations = ['=']
  }

}
