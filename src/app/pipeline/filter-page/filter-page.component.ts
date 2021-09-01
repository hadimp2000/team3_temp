import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss']
})
export class FilterPageComponent implements OnInit,AfterViewInit {
  @ViewChild('toolbar') toolbar!: ElementRef;
  @ViewChild('form') form!: ElementRef;
  public counter = 0;
  public toolbarHeight:any;
  public add_node_flag:boolean=false;
  public ogma: any;
  public nodes: any = [];
  public links: any = [];
  public nodesMaxCount: number = 10;
  public nodesCount!: number;
  public linksCount!: number;
  public width!: number;
  public height!: number;

  constructor() {
    localStorage.clear();
  }

  ngOnInit(): void {
    // @ts-ignore
    const Ogma = require('../../../assets/ogma.min.js');
    this.ogma = new Ogma({
      container: 'graph-container',
    });
    this.width = this.ogma.getContainer().offsetWidth;
    this.height = this.ogma.getContainer().offsetHeight;
    this.ogma.styles.setSelectedNodeAttributes({
      color: false,
      outline: false,
      outerStroke: {
        color: 'red'
      }
    });
    this.ogma.styles.setHoveredNodeAttributes({
      color: false,
      outline: false,
      outerStroke: {
        color: 'red'
      }
    });
    this.ogma.events.onDragStart(() => {
      if (this.getMode('drag-action') === 'links') {
        this.ogma.tools.connectNodes.enable({
          strokeColor: 'red',
          createNodes: false,
          // avoid self edges
          condition: (source:any, target:any) => source.getId() !== target.getId(),
          createEdge: (edge:any) => {
            edge.attributes = { shape: { head: 'arrow' } };
            return edge;
          }
        });
      }
    });
    this.ogma.events.onKeyPress('del', this.deleteItems);
    this.ogma.events.onKeyPress('backspace', this.deleteItems);
  }

  ngAfterViewInit() {
    this.toolbarHeight = this.toolbar.nativeElement.offsetHeight;
    console.log(this.toolbarHeight)
  }

  public createNode(id:number, label:any, url:any, x:any, y:any)  {
    this.counter++;
    return {
      id: id + this.counter,
      attributes: {
        radius: 5,
        shape: 'square',
        color: 'transparent',
        outerStroke: 'transparent',
        innerStroke: 'transparent',
        text: id,
        image: url,
        x: x,
        y: y
      },
      data: { type: id }
    };
  };

  public dragBehaviour(event:any){
    event.dataTransfer.setData('type', event.target.id);
    event.dataTransfer.setData('image', event.target.src);
  }

  public preventBrowser(event:any){
    event.preventDefault();
  }

  public drop(event:any) {
    // Convert the drop point to graph coords
    const pos = this.ogma.view.screenToGraphCoordinates({
      x: event.clientX,
      y: event.clientY - this.toolbarHeight
    });
    // now get the icons type and its URL
    const id = event.dataTransfer.getData('type');
    const url = event.dataTransfer.getData('image');
    // tell the browser to leave the icon on the toolbar
    event.dataTransfer.dropEffect = 'copy';
    event.preventDefault();
    // create a node on the graph to the exact x and y of the drop
    this.ogma.addNode(this.createNode(id, id, url, pos.x, pos.y));
    this.ogma.view.locateGraph({ duration: 500 });
  }

  public deleteItems() {
    const selectedNodes = this.ogma.getSelectedNodes();
    const selectedEdges = this.ogma.getSelectedEdges();
    if (selectedNodes || selectedEdges) {
      if (selectedNodes) {
        this.ogma.removeNodes(selectedNodes);
      }
      if (selectedEdges) {
        this.ogma.removeEdges(selectedEdges);
      }
    }
  }

  public getMode(id:any) {
    const form = document.querySelector('form');
    let select;
    if (form) {
      select = form[id];
    }
     // IE inconsistency
    return Array.prototype.filter.call(select, input => {
      return input.checked;
    })[0].value;
  }


  // public initOgma(): void {
  //
  //
  //   // graph-container width and height
  //
  //   this.nodesCount = Math.floor(Math.random() * this.nodesMaxCount) + 1;
  //   this.linksCount = Math.floor(Math.random() * this.nodesMaxCount);
  //   // random nodes count and links count
  //
  //   // creating nodes
  //   this.nodes = [];
  //   for (let i = 0; i < this.nodesCount; i++) {
  //     const randomX = Math.random() * this.width - this.width / 2;
  //     const randomY = Math.random() * this.height - this.height / 2;
  //
  //     this.nodes.push({
  //       id: 'n' + i,
  //       data: { name: 'Node ' + i },
  //       attributes: { x: randomX, y: randomY, radius: 20 },
  //     }); // data is a custom dictionary for containing data
  //   }
  //
  //   this.ogma.addNodes(this.nodes);
  //   // adding created nodes to ogma
  //
  //   // creating links
  //   this.links = [] as any;
  //   for (let i = 0; i < this.linksCount; i++) {
  //     const sourceId = 'n' + Math.floor(Math.random() * this.nodesCount);
  //     const targetId = 'n' + Math.floor(Math.random() * this.nodesCount);
  //
  //     if (sourceId === targetId && this.nodesCount !== 1) {
  //       i--;
  //       continue;
  //     }
  //
  //     const link = {
  //       id: 'e' + i,
  //       source: sourceId,
  //       target: targetId,
  //       data: { name: 'parent' },
  //     };
  //
  //     this.links.push(link); // data is a custom dictionary for containing data
  //   }
  //
  //   this.ogma.addEdges(this.links);
  //   // adding created links to ogma
  // }

  // public createNode(event:any) {
  //
  //   if (!this.add_node_flag)
  //     return;
  //   this.nodes = [];
  //
  //   if (localStorage.getItem("node_number")===null)
  //     localStorage.setItem("node_number","0");
  //   // @ts-ignore
  //   let node_number:number=parseInt(localStorage.getItem("node_number"));
  //   console.log(this.width)
  //   console.log(this.height)
  //   const node={
  //     id: 'n' + node_number,
  //     data: { name: 'Node ' + node_number },
  //     attributes: { x: (event.clientX-(this.width/2)), y: (event.clientY-(this.height/2)) , radius: 20 },
  //   };
  //   console.log(node)
  //   this.nodes.push(node);
  //   node_number++;
  //   localStorage.setItem("node_number",node_number.toString())
  //   this.ogma.addNode(node);
  //   this.add_node_flag=false;
  //   this.ogma.view.locateGraph();
  //
  // }

}
