import {Component, OnInit} from '@angular/core';
import {PipelineServiceService} from '../../services/pipeline-service.service';
import {BoardService} from '../service/board.service';

@Component({
  selector: 'app-pipeline-details',
  templateUrl: './pipeline-details.component.html',
  styleUrls: ['./pipeline-details.component.scss'],
})
export class PipelineDetailsComponent implements OnInit {
  constructor(
    public boardService: BoardService,
    private pipelineServiceService: PipelineServiceService
  ) {
  }

  async ngOnInit() {
    this.boardService.status = await this.pipelineServiceService.getStatus(
      this.boardService.pipelineName
    );
  }

  changeDist() {
    this.boardService._addDataModal.openDialog(this.boardService, 'changeDist');
  }
}
