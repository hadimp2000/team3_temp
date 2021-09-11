import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FilterDetailsModel} from "../filter-details.model";
import {DataSetServiceService} from "../../../services/data-set-service.service";
import {BoardService} from "../../service/board.service";


@Component({
  selector: 'app-filter-details',
  templateUrl: './filter-details.component.html',
  styleUrls: ['./filter-details.component.scss']
})
export class FilterDetailsComponent implements OnInit {
  @Input() filter_details!: FilterDetailsModel;
  @Output() filter_changes: EventEmitter<FilterDetailsModel> = new EventEmitter<FilterDetailsModel>();
  public operation!: string;
  public temp: boolean = true;
  public value!: string;
  public column!: string;
  public columns: string[] = [];
  public operations: string[] = ['=', '<', '>'];

  constructor(private dataSetServiceService:DataSetServiceService,private boardService:BoardService) {
  }

  async ngOnInit() {
    const datatable=await this.dataSetServiceService.getCsvDataSet(""+this.boardService.sourceName)
    // @ts-ignore
    this.columns=datatable[0];
  }

  public saveFilter(formValues: any) {
    this.filter_changes.emit(
      {
        showForm: false,
        id: this.filter_details.id,
        column: formValues.column,
        operation: formValues.operation,
        value: formValues.value
      }
    )
  }

}
