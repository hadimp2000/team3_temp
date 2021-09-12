import {Component, OnInit} from '@angular/core';
import {DataSetServiceService} from "../../services/data-set-service.service";
import {BoardService} from "../service/board.service";

@Component({
  selector: 'app-pipeline-table',
  templateUrl: './pipeline-table.component.html',
  styleUrls: ['./pipeline-table.component.scss']
})
export class PipelineTableComponent implements OnInit {
  public dataset!: Array<any>[];
  public dataName: string = ""+this.boardService.sourceName;

  constructor(private dataSetServiceService:DataSetServiceService,private boardService:BoardService) {
  }

  async ngOnInit() {
    this.dataset=await this.dataSetServiceService.getCsvDataSet(""+this.boardService.sourceName)
    console.log(this.dataset)
  }

  public createRange(number:any){
    return new Array(number-1);
  }

}
