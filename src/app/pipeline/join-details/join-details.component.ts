import {Component, Input, OnInit} from '@angular/core';
import {FilterDetailsModel} from "../filter-page/filter-details.model";
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
  @Input() joinId!: string ;
  public datasets: string[] = [];
  public table1_columns: string[] = [];
  public table2_columns: string[] = [];

  constructor(private boardService:BoardService,private dataSetServiceService:DataSetServiceService) {
  }

  async ngOnInit() {
    let datasets:object[]=await this.dataSetServiceService.getAllDataSets();
    if(datasets.length===0){
      this.datasets=[];
    }
    else {
      // @ts-ignore
      datasets.forEach(dataset=>this.datasets.push(dataset.name));
    }
    const datatable=await this.dataSetServiceService.getCsvDataSet(""+this.boardService.sourceName)
    // @ts-ignore
    this.table1_columns=datatable[0];

  }

  public saveJoin(formValues: any) {
    const data={
      name:'process-join',
      dataset:formValues.dataset,
      joinType:formValues.joinType,
      rightKey: formValues.rightKey,
      leftKey: formValues.leftKey
    }
    this.boardService.changeNodeData(this.joinId,data);
  }

  public async chooseDataset(event:any){
    const datatable=await this.dataSetServiceService.getCsvDataSet(event.target.value)
    // @ts-ignore
    this.table2_columns=datatable[0];
  }

}
