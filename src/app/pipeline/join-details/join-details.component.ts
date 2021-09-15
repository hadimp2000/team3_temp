import {Component, Input, OnInit} from '@angular/core';
import {JoinDetailsModel} from "./join-details.model";
import {BoardService} from "../service/board.service";
import {DataSetServiceService} from "../../services/data-set-service.service";

@Component({
  selector: 'app-join-details',
  templateUrl: './join-details.component.html',
  styleUrls: ['./join-details.component.scss']
})
export class JoinDetailsComponent implements OnInit {
  @Input() join_details!: JoinDetailsModel;
  @Input() joinId!: string;
  public datasets: string[] = [];
  public table1_columns: string[] = [];
  public table2_columns: string[] = [];

  constructor(private boardService: BoardService, private dataSetServiceService: DataSetServiceService) {
  }

  async ngOnInit() {
    let datasets: object[] = await this.dataSetServiceService.getAllDataSets();
    if (datasets.length === 0) {
      this.datasets = [];
    } else {
      // @ts-ignore
      datasets.forEach(dataset => this.datasets.push(dataset.name));
    }

    const sourceType: string = await this.dataSetServiceService.csvOrSql("" + this.boardService.sourceName);
    let dataTable;
    if (sourceType === 'csv')
      dataTable = await this.dataSetServiceService.getCsvDataSet("" + this.boardService.sourceName)
    else
      dataTable = await this.dataSetServiceService.getSqlDataSet("" + this.boardService.sourceName)
    this.table1_columns = dataTable[0];

    if (this.join_details.dataset !== "") {
      const secondDatasetType: string = await this.dataSetServiceService.csvOrSql(this.join_details.dataset);
      let dataTable2;
      if (secondDatasetType === 'csv')
        dataTable2 = await this.dataSetServiceService.getCsvDataSet(this.join_details.dataset)
      else
        dataTable2 = await this.dataSetServiceService.getSqlDataSet(this.join_details.dataset)
      this.table2_columns = dataTable2[0];
    }
  }

  public saveJoin(formValues: any) {
    const data = {
      name: 'process-join',
      dataset: formValues.dataset,
      joinType: formValues.joinType,
      rightKey: formValues.rightKey,
      leftKey: formValues.leftKey
    }
    this.boardService.changeNodeData(this.joinId, data);
  }

  public async chooseDataset(event: any) {
    const name: string = event.target.value;
    const type: string = await this.dataSetServiceService.csvOrSql(name);
    let datatable;
    if (type === 'csv')
      datatable = await this.dataSetServiceService.getCsvDataSet(name)
    else
      datatable = await this.dataSetServiceService.getSqlDataSet(event.target.value)
    this.table2_columns = datatable[0];
  }
}
