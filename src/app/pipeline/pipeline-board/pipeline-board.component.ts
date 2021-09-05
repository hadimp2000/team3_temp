import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AddDataModalComponent } from './modals/add-data-modal/add-data-modal.component';
import { BoardService } from './service/board.service';
declare var require: any;

@Component({
  selector: 'app-pipeline-board',
  templateUrl: './pipeline-board.component.html',
  styleUrls: ['./pipeline-board.component.scss'],
})
export class PipelineBoardComponent implements OnInit {
  @ViewChild('board') board: ElementRef | null = null;
  private zoom = 1;
  constructor(private _pipelineService: BoardService) {}

  ngOnInit(): void {
    const Ogma = require('../../../assets/Ogma/ogma.min.js');
    this._pipelineService.ogma = new Ogma({
      container: 'graph-container',
    });
    this._pipelineService.ngInitFunc();
  }
  ngAfterViewInit() {
    if (this.board) this.board.nativeElement.style.zoom = `${this.zoom}`;
  }
  public zoomInCLick() {
    this.zoom += 0.1;
    if (this.board) this.board.nativeElement.style.zoom = `${this.zoom}`;
  }
  public zoomOutCLick() {
    this.zoom -= 0.1;
    if (this.board) this.board.nativeElement.style.zoom = `${this.zoom}`;
  }
}
