import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {PipelineServiceService} from "../../services/pipeline-service.service";

@Component({
  selector: 'app-pipeline-header',
  templateUrl: './pipeline-header.component.html',
  styleUrls: ['./pipeline-header.component.scss']
})
export class PipelineHeaderComponent implements OnInit {
  @Input()pipelineName!:string;
  @Output() detailsIcon: EventEmitter<string> = new EventEmitter<string>();
  @Output() tableIcon: EventEmitter<string> = new EventEmitter<string>();
  public canCancel:boolean=false;

  constructor(private router: Router,private pipelineServiceService:PipelineServiceService) {
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
    await this.router.navigateByUrl('/pipelines/dataSet');
  }

  public async download(){
    await this.pipelineServiceService.downloadYML(this.pipelineName);
  }

  public async run(){
    if (!this.canCancel)
    {
      this.canCancel=true;
      //run
    }
  }

  public cancel(){

  }

}
