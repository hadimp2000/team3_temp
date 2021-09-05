import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-pipeline-header',
  templateUrl: './pipeline-header.component.html',
  styleUrls: ['./pipeline-header.component.scss']
})
export class PipelineHeaderComponent implements OnInit {
  @Output() detailsIcon: EventEmitter<string> = new EventEmitter<string>();
  @Output() tableIcon: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {
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

}
