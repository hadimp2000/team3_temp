import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JoinDetailsModel } from './join-details/join-details.model';
import { BoardService } from './service/board.service';
import { AggregateDetailsModel } from './aggregate-details/aggregate-details.model';
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
  public detailsMode: string = 'pipeline';
  public joinDetails: JoinDetailsModel = {
    dataset: '',
    joinType: '',
    leftKey: '',
    rightKey: '',
  };
  public aggregateDetails: AggregateDetailsModel = {
    column: '',
    operation: '',
    outputName: '',
    groupColumns: [''],
  };
  public selectedNodeId!: string;
  public filterTree!: any;

  constructor(private _pipelineService: BoardService) {}

  ngOnInit(): void {
    const Ogma = require('../../assets/Ogma/ogma.min.js');
    this._pipelineService.ogma = new Ogma({
      container: 'graph-container',
    });
    this._pipelineService.ngInitFunc();
    this._pipelineService.ogma.events.onKeyPress('del', this.deleteNodes);
    this.AllOnClickEvents();
  }

  deleteNodes = () => {
    const selectedNodes = this._pipelineService.ogma.getSelectedNodes();
    if (selectedNodes) {
      let node = selectedNodes.get(0);
      if (
        node.getId() === 'source' ||
        node.getId() === 'selectSrc' ||
        node.getId() === 'selectDis' ||
        node.getData('name') === 'add'
      ) {
        return;
      } else {
        this.detailsMode = 'pipeline';
        this._pipelineService.deleteNodes(node);
        this._pipelineService.ogma.removeNodes(selectedNodes);
      }
    }
  };
  AllOnClickEvents(): void {
    this._pipelineService.ogma.events.onClick((evt: any) => {
      if (evt.target === null) {
        this.detailsMode = 'pipeline';
      } else if (evt.target.isNode) {
        if (evt.target.getId() === 'selectSrc') {
          this._pipelineService._addDataModal.openDialog(
            this._pipelineService,
            'source'
          );
        } else if (evt.target.getId() === 'selectDis') {
          this._pipelineService._addDataModal.openDialog(
            this._pipelineService,
            'dist'
          );
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
          // this._pipelineService._router.navigateByUrl(
          //   `pipeline/${this._pipelineService.pipelineId}/${evt.target.getId()}`
          // );
          this.selectedNodeId = evt.target.getId();
          this.filterTree = evt.target.getData('filterTree');
          this.detailsMode = 'filter';
        } else if ('process-join' === evt.target.getData('name')) {
          this.selectedNodeId = evt.target.getId();
          this.joinDetails = {
            dataset: evt.target.getData('dataset'),
            joinType: evt.target.getData('joinType'),
            leftKey: evt.target.getData('leftKey'),
            rightKey: evt.target.getData('rightKey'),
          };
          this.detailsMode = 'join';
        } else if ('process-aggregate' === evt.target.getData('name')) {
          this.selectedNodeId = evt.target.getId();
          this.aggregateDetails = {
            column: evt.target.getData('column'),
            operation: evt.target.getData('operation'),
            outputName: evt.target.getData('outputName'),
            groupColumns: evt.target.getData('groupColumns'),
          };
          this.detailsMode = 'aggregate';
        } else {
          this.detailsMode = 'pipeline';
        }
      } else {
        this._pipelineService.ogma.export
          .json({
            download: true,
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
        ? '30rem'
        : '80vh';
  }

  public changeMode() {
    this.detailsMode = 'pipeline';
  }

  public download() {

  }
}
