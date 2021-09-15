import {Component, Input, OnInit} from '@angular/core';
import {AggregateDetailsModel} from './aggregate-details.model';
import {BoardService} from '../service/board.service';
import {DataSetServiceService} from '../../services/data-set-service.service';

@Component({
  selector: 'app-aggregate-details',
  templateUrl: './aggregate-details.component.html',
  styleUrls: ['./aggregate-details.component.scss'],
})
export class AggregateDetailsComponent implements OnInit {
  @Input() aggregate_details!: AggregateDetailsModel;
  @Input() aggregateId!: string;
  public columns: string[] = [];

  constructor(
    private boardService: BoardService,
    private dataSetServiceService: DataSetServiceService
  ) {
  }

  async ngOnInit() {
    const sourceType: string = await this.dataSetServiceService.csvOrSql("" + this.boardService.sourceName);
    let dataTable;
    if (sourceType === 'csv')
      dataTable = await this.dataSetServiceService.getCsvDataSet("" + this.boardService.sourceName)
    else
      dataTable = await this.dataSetServiceService.getSqlDataSet("" + this.boardService.sourceName)
    this.columns = dataTable[0];
  }

  public addGroup() {
    this.aggregate_details.groupColumns?.push('');
  }

  public save(formValues: any) {
    const {columns, operations, outputName, ...groupsObj} = formValues;
    const groupArray: string[] = Object.values(groupsObj);
    const data = {
      name: 'process-aggregate',
      column: formValues.columns,
      operation: formValues.operations,
      outputName: formValues.outputName,
      groupColumns: groupArray,
    };
    this.boardService.changeNodeData(this.aggregateId, data);
  }
}
