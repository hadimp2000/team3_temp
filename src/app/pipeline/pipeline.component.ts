import { Component, OnInit } from '@angular/core';
import { JoinDetailsModel } from './join-details/join-details.model';
import { BoardService } from './service/board.service';
import {ActivatedRoute} from "@angular/router";
declare var require: any;
@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss'],
})
export class PipelineComponent implements OnInit {
  public showDetails: boolean = true;
  public showTable: boolean = true;

  constructor(public _pipelineService: BoardService) {
  }

  ngOnInit(): void {
    const Ogma = require('../../assets/Ogma/ogma.min.js');
    this._pipelineService.ogma = new Ogma({
      container: 'graph-container',
    });
    this._pipelineService.ngInitFunc();
  }

  public showOrHideDetails() {
    this.showDetails = !this.showDetails;
  }

  public showOrHideTable() {
    this.showTable = !this.showTable;
  }
}
