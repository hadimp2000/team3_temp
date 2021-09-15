import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DataSetServiceService} from "../../services/data-set-service.service";
import {BoardService} from "../service/board.service";

@Component({
  selector: 'app-pipeline-table',
  templateUrl: './pipeline-table.component.html',
  styleUrls: ['./pipeline-table.component.scss']
})
export class PipelineTableComponent implements OnChanges {
  @Input() sourceOrDest!: string;
  public dataset!: Array<any>[];

  constructor(private dataSetServiceService: DataSetServiceService, public boardService: BoardService) {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (this.sourceOrDest === 'source') {
      const sourceType: string = await this.dataSetServiceService.csvOrSql("" + this.boardService.sourceName);
      if (sourceType === 'csv')
        this.dataset = await this.dataSetServiceService.getCsvDataSet("" + this.boardService.sourceName)
      else
        this.dataset = await this.dataSetServiceService.getSqlDataSet("" + this.boardService.sourceName)
    } else {
      const destType: string = await this.dataSetServiceService.csvOrSql("" + this.boardService.DistName);
      if (destType === 'csv')
        this.dataset = await this.dataSetServiceService.getCsvDataSet("" + this.boardService.DistName)
      else
        this.dataset = await this.dataSetServiceService.getSqlDataSet("" + this.boardService.DistName)
    }
  }

  public createRange(number: any) {
    return new Array(number - 1);
  }

}
