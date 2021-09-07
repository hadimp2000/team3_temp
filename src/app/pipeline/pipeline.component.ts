import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { JoinDetailsModel } from './join-details/join-details.model';
import { BoardService } from './service/board.service';
declare var require: any;
@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss'],
})
export class PipelineComponent implements OnInit {
  @ViewChild('mainOgma') main: ElementRef | null = null;
  public showDetails: boolean = true;
  public showTable: boolean = true;
  public detailsMode: string = 'aggregate';
  public joinDetails: JoinDetailsModel = {
    dataset: '',
    joinType: '',
    leftKey: '',
    rightKey: '',
  };

  constructor(private _pipelineService: BoardService) {}

  ngOnInit(): void {
    const Ogma = require('../../assets/Ogma/ogma.min.js');
    this._pipelineService.ogma = new Ogma({
      container: 'graph-container',
    });
    this._pipelineService.ngInitFunc();
    this.AllOnClickEvents();
  }

  AllOnClickEvents(): void {
    this._pipelineService.ogma.events.onClick((evt: any) => {
      if (evt.target === null) {
      } else if (evt.target.isNode) {
        if (evt.target.getId() == 'selectSrc') {
          this._pipelineService._addDataModal.openDialog();
          //if seleced returns a name ,then pass to this function
          this._pipelineService.tempFuncAddSrc('source name');
        } else if (evt.target.getId() == 'selectDis') {
          this._pipelineService._addDataModal.openDialog();
          //if seleced returns a name ,then pass to this function
          this._pipelineService.tempFuncAddDis('dist name');
        } else if (evt.target.getData('name') === 'add') {
          let i = evt.target.getAdjacentNodes();
          this._pipelineService._addProcessModal.openDialog(
            this._pipelineService,
            {
              src: i.get(0).getId(),
              dist: i.get(1).getId(),
              id: evt.target.getId(),
            }
          );
        } else if ('process-filter' === evt.target.getData('name')) {
          this._pipelineService._router.navigateByUrl(
            `pipeline/${this._pipelineService.pipelineId}/${evt.target.getId()}`
          );
          this.detailsMode = 'filter';
        } else if ('process-join' === evt.target.getData('name')) {
          this.detailsMode = 'join';
        } else {
          this.detailsMode = 'aggregate';
        }
      } else {
        this._pipelineService.ogma.export
          .json({
            download: false,
            pretty: true,
          })
          .then((json: any) => {
            console.log(json);
          });
      }
    });
  }

  public showOrHideDetails() {
    this.showDetails = !this.showDetails;
    if (this.main)
      this.main.nativeElement.style.maxWidth = this.showDetails
        ? '1200px'
        : '1500px';
  }

  public showOrHideTable() {
    this.showTable = !this.showTable;
    if (this.main)
      this.main.nativeElement.style.maxHeight = this.showTable
        ? '48vh'
        : '80vh';
  }
}
