import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FilterDetailsModel} from "./filter-details.model";
import {BoardService} from "../service/board.service";

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss']
})
export class FilterPageComponent implements OnInit, AfterViewInit {
  @ViewChild('toolbar') toolbar!: ElementRef;
  @ViewChild('form') form!: ElementRef;
  @Input() filterId!: string;
  @Input() tree!: any;
  @Output() changeMode: EventEmitter<string> = new EventEmitter<string>();
  public filter_details: FilterDetailsModel;
  public counter = 0;
  public edgeCounter = 0;
  public toolbarHeight: any;
  public ogma: any;
  public nodes: any = [];
  public links: any = [];
  public width!: number;
  public height!: number;

  constructor(private boardService: BoardService) {
    this.filter_details = {
      showForm: false,
      id: "",
      column: "",
      operation: "",
      value: ""
    }
  }

  ngOnInit(): void {
    // @ts-ignore
    const Ogma = require('../../../assets/ogma.min.js');
    if (Object.keys(this.tree).length !== 0) {
      this.ogma = new Ogma({
        graph: this.tree,
        container: 'graph-container',
      });
    } else {
      this.ogma = new Ogma({
        container: 'graph-container',
      });
    }
    this.width = this.ogma.getContainer().offsetWidth;
    this.height = this.ogma.getContainer().offsetHeight;
    this.ogma.styles.setSelectedNodeAttributes({
      color: false,
      outline: false,
      outerStroke: {
        color: '#282A35'
      }
    });
    this.ogma.styles.setHoveredNodeAttributes({
      color: false,
      outline: false,
      outerStroke: {
        color: '#282A35'
      }
    });
    this.ogma.styles.addEdgeRule({
      color: '#282A35'
    });
    this.ogma.events.onDragStart(() => {
      if (this.getMode('drag-action') === 'links') {
        this.edgeCounter++;
        this.ogma.tools.connectNodes.enable({
          strokeColor: '#282A35',
          createNodes: false,
          // avoid self edges
          condition: (source: any, target: any) => source.getId() !== target.getId(),
          createEdge: (edge: any) => {
            edge.attributes = {shape: {head: 'arrow'}};
            return edge;
          }
        });
      }
    });
    this.ogma.events.onClick((evt: any) => {
      const target = evt.target;
      if (target) {
        if (target.getData('type') === 'condition') {
          this.filter_details = {
            showForm: true,
            id: target.getId(),
            column: target.getData('column'),
            operation: target.getData('operation'),
            value: target.getData('value')
          }
        } else {
          this.filter_details = {
            showForm: false,
            id: "",
            column: "",
            operation: "",
            value: ""
          }
        }
      } else {
        this.filter_details = {
          showForm: false,
          id: "",
          column: "",
          operation: "",
          value: ""
        }
      }

    });

    let deleteItems = () => {
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
    this.ogma.events.onKeyPress('del', deleteItems);
  }

  ngAfterViewInit() {
    this.toolbarHeight = this.toolbar.nativeElement.offsetHeight;
  }

  public createSimpleNode(id: any, x: any, y: any, color: any) {
    this.counter++;
    return {
      id: id + this.counter,
      attributes: {
        radius: 5,
        shape: 'circle',
        color: color,
        outerStroke: 'transparent',
        innerStroke: 'transparent',
        text: id,
        x: x,
        y: y
      },
      data: {type: id}
    };
  };

  public createConditionNode(id: any, x: any, y: any) {
    this.counter++;
    return {
      id: id + this.counter,
      attributes: {
        radius: 5,
        shape: 'circle',
        color: '#6643B5',
        outerStroke: 'transparent',
        innerStroke: 'transparent',
        text: id,
        x: x,
        y: y
      },
      data: {
        type: id,
        column: '',
        operation: '',
        value: ''
      }
    };
  };

  public dragBehaviour(event: any) {
    event.dataTransfer.setData('type', event.target.id);
  }

  public preventBrowser(event: any) {
    event.preventDefault();
  }

  public drop(event: any) {
    // Convert the drop point to graph coords
    const pos = this.ogma.view.screenToGraphCoordinates({
      x: event.clientX,
      y: event.clientY - this.toolbarHeight
    });
    // now get the icons type and its URL
    const id = event.dataTransfer.getData('type');
    // tell the browser to leave the icon on the toolbar
    event.dataTransfer.dropEffect = 'copy';
    event.preventDefault();
    // create a node on the graph to the exact x and y of the drop
    switch (id) {
      case 'and': {
        this.ogma.addNode(this.createSimpleNode(id, pos.x, pos.y, '#430F58'));
        break
      }
      case 'or': {
        this.ogma.addNode(this.createSimpleNode(id, pos.x, pos.y, '#8594E4'));
        break
      }
      case 'condition': {
        this.ogma.addNode(this.createConditionNode(id, pos.x, pos.y));
        break
      }
    }
    this.ogma.view.locateGraph({duration: 500});
  }

  public getMode(id: any) {
    const form = document.querySelector('.switch');
    let select;
    if (form) {
      // @ts-ignore
      select = form[id];
    }
    // IE inconsistency
    return Array.prototype.filter.call(select, input => {
      return input.checked;
    })[0].value;
  }

  public async saveFilters() {
    let data = {};
    const promise = new Promise<void>((resolve, reject) => {
      this.ogma.export.json({
        download: false,
        pretty: true
      }).then(function (json: any) {
        data = {
          name: 'process-filter',
          filterTree: JSON.parse(json)
        }
      });
      resolve();
    });
    await promise;
    this.boardService.changeNodeData(this.filterId, data);
    this.changeMode.emit("pipeline")
  }

  public addFilter(event: FilterDetailsModel) {
    const changedNode = this.ogma.getNode(event.id);
    changedNode.setData({
      type: 'condition',
      id: event.id,
      column: event.column,
      operation: event.operation,
      value: event.value
    });
    changedNode.setAttribute('text', `${event.column} ${event.operation} ${event.value}`);
  }

  public cancel() {
    this.changeMode.emit("pipeline")
  }
}
