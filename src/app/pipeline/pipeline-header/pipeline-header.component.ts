import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {PipelineServiceService} from "../../services/pipeline-service.service";
import {BoardService} from "../service/board.service";

@Component({
  selector: 'app-pipeline-header',
  templateUrl: './pipeline-header.component.html',
  styleUrls: ['./pipeline-header.component.scss']
})
export class PipelineHeaderComponent implements OnInit {
  @Output() detailsIcon: EventEmitter<string> = new EventEmitter<string>();
  @Output() tableIcon: EventEmitter<string> = new EventEmitter<string>();
  public canCancel: boolean = false;

  constructor(public boardService: BoardService, private router: Router, private pipelineServiceService: PipelineServiceService) {
  }

  ngOnInit(): void {
  }

  public clickDetailsIcon() {
    this.detailsIcon.emit("clicked");
  }

  public clickTableIcon() {
    this.tableIcon.emit("clicked");
  }

  public async prevPage() {
    await this.router.navigateByUrl('/pipelines/pipelinesList');
    // location.reload();
  }

  public async download() {
    await this.pipelineServiceService.downloadYML(this.boardService.pipelineName);
  }

  public async run() {
    if (!this.canCancel) {
      this.canCancel = true;
      await this.pipelineServiceService.run("" + this.boardService.DistName, this.boardService.pipelineName);
      const interval = setInterval(async () => {
        console.log(this.boardService.status)
        this.boardService.status = await this.pipelineServiceService.getStatus(this.boardService.pipelineName);
        if (this.boardService.status === 'Finished' || this.boardService.status === 'Failed') {
          this.canCancel = false;
          clearInterval(interval);
        }
      }, 1000);
    }
  }

  public cancel() {

  }

}
