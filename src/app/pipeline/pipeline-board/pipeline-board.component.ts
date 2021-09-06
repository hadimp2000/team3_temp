import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pipeline-board',
  templateUrl: './pipeline-board.component.html',
  styleUrls: ['./pipeline-board.component.scss'],
})
export class PipelineBoardComponent implements OnInit {
  @ViewChild('board') board: ElementRef | null = null;
  private zoom = 1;
  constructor() {}

  ngOnInit(): void {}
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
