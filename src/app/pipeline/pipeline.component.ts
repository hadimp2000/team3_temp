import {Component, OnInit} from '@angular/core';
import {JoinDetailsModel} from "./join-details/join-details.model";

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss']
})
export class PipelineComponent implements OnInit {
  public showDetails: boolean = true;
  public showTable: boolean = true;
  public detailsMode: string = 'aggregate';
  public joinDetails: JoinDetailsModel = {
    dataset: '',
    joinType: '',
    leftKey: '',
    rightKey: ''
  };

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
