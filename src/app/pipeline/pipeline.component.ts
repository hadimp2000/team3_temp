import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss']
})
export class PipelineComponent implements OnInit {
  public showDetails:boolean = true;
  public showTable:boolean = true;
  constructor() {
  }

  ngOnInit(): void {
  }

  public showOrHideDetails() {
    this.showDetails = !this.showDetails
  }

  public showOrHideTable() {
    this.showTable = !this.showTable
  }
}
