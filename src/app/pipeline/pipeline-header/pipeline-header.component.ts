import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ToastService} from 'src/app/common/toast.service';
import {PipelineServiceService} from '../../services/pipeline-service.service';
import {BoardService} from '../service/board.service';

@Component({
  selector: 'app-pipeline-header',
  templateUrl: './pipeline-header.component.html',
  styleUrls: ['./pipeline-header.component.scss'],
})
export class PipelineHeaderComponent {
  @Output() detailsIcon: EventEmitter<string> = new EventEmitter<string>();
  @Output() tableIcon: EventEmitter<string> = new EventEmitter<string>();
  public canCancel: boolean = false;

  constructor(
    public boardService: BoardService,
    private router: Router,
    private pipelineServiceService: PipelineServiceService,
    private _toaster: ToastService
  ) {
  }

  public clickDetailsIcon() {
    this.detailsIcon.emit('clicked');
  }

  public clickTableIcon() {
    this.tableIcon.emit('clicked');
  }

  public async prevPage() {
    await this.router.navigateByUrl('/pipelines/pipelinesList');
  }

  public async download() {
    await this.pipelineServiceService.downloadYML(
      this.boardService.pipelineName
    );
  }

  public async run() {
    if (!this.canCancel) {
      this.canCancel = true;
      await this.pipelineServiceService.run(
        '' + this.boardService.DistName,
        this.boardService.pipelineName
      );
      const interval = setInterval(async () => {
        this.boardService.status = await this.pipelineServiceService
          .getStatus(this.boardService.pipelineName)
          .then((res) => {
            this._toaster.openSnackBar(res, 'server');
            return res;
          })
          .catch((err) => {
            this._toaster.openSnackBar(err, 'server');
            clearInterval(interval);
            this.canCancel = false;
            return err;
          });
        if (
          this.boardService.status === 'Finished' ||
          this.boardService.status === 'Failed'
        ) {
          this.canCancel = false;
          clearInterval(interval);
        }
      }, 1000);
    }
  }

  public async cancel() {
    await this.pipelineServiceService.cancel();
  }
}
