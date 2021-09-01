import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var require: any;

@Component({
  selector: 'app-pipeline-board',
  templateUrl: './pipeline-board.component.html',
  styleUrls: ['./pipeline-board.component.scss'],
})
export class PipelineBoardComponent implements OnInit {
  @ViewChild('board') board: ElementRef | null = null;
  private zoom = 1;
  constructor() {}
  private ogma: any;
  private nodes: any = [];
  private links: any = [];
  private nodesMaxCount: number = 10;
  private nodesCount!: number;
  private linksCount!: number;
  private width!: number;
  private height!: number;

  ngOnInit(): void {
    this.initOgma();
  }
  private initOgma(): void {
    const Ogma = require('../../../assets/Ogma/ogma.min.js');
    this.ogma = new Ogma({
      container: 'graph-container',
    });

    this.width = this.ogma.getContainer().offsetWidth;
    this.height = this.ogma.getContainer().offsetHeight;
    // graph-container width and height

    this.nodesCount = Math.floor(Math.random() * this.nodesMaxCount) + 1;
    this.linksCount = Math.floor(Math.random() * this.nodesMaxCount);
    // random nodes count and links count

    // creating nodes
    this.nodes = [];
    for (let i = 0; i < this.nodesCount; i++) {
      const randomX = Math.random() * this.width - this.width / 2;
      const randomY = Math.random() * this.height - this.height / 2;

      this.nodes.push({
        id: 'n' + i,
        data: { name: 'Node ' + i },
        attributes: { x: randomX, y: randomY, radius: 20 },
      }); // data is a custom dictionary for containing data
    }

    this.ogma.addNodes(this.nodes);
    // adding created nodes to ogma

    // creating links
    this.links = [] as any;
    for (let i = 0; i < this.linksCount; i++) {
      const sourceId = 'n' + Math.floor(Math.random() * this.nodesCount);
      const targetId = 'n' + Math.floor(Math.random() * this.nodesCount);

      if (sourceId === targetId && this.nodesCount !== 1) {
        i--;
        continue;
      }

      const link = {
        id: 'e' + i,
        source: sourceId,
        target: targetId,
        data: { name: 'parent' },
      };

      this.links.push(link); // data is a custom dictionary for containing data
    }

    this.ogma.addEdges(this.links);
    // adding created links to ogma
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
