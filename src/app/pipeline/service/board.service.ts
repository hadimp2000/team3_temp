import { Injectable } from '@angular/core';
import { AddDataModalComponent } from '../pipeline-board/modals/add-data-modal/add-data-modal.component';
import { AddProcessModalComponent } from '../pipeline-board/modals/add-process-modal/add-process-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public ogma: any;
  private addId = 0;
  private edgeId = 0;
  public pipelineId = 0;
  constructor(
    public _addDataModal: AddDataModalComponent,
    public _addProcessModal: AddProcessModalComponent,
    public _router: Router,
    public _Activatedroute: ActivatedRoute
  ) {
    this._Activatedroute.paramMap.subscribe((params) => {
      let pipeline_id = params.get('id');
      if (pipeline_id) this.pipelineId = parseInt(pipeline_id);
    });
  }

  private ObjAddNode = (id: string, x: Number) => ({
    id: id,
    data: { name: 'add', type: 'add' },
    attributes: {
      image: {
        url: '../../../assets/icons/add_circle_black_24dp.svg',
        scale: 0.5,
      },
      x: x,
      text: { content: 'add process' },
      shape: 'circle',
    },
  });

  private ObjCmnNode = (
    id: String,
    urlImg: String,
    content: String,
    _x: Number
  ) => ({
    id: id,
    data: { name: content, type: 'common' },
    attributes: {
      image: {
        url: urlImg,
        scale: 0.5,
      },
      x: _x,
      text: { content: content },
    },
  });

  private ObjFilterNode = (name: String, _x: Number, type: String) => ({
    id: name,
    data: {
      name: 'process-filter',
      filterTree: {},
      type: 'filter',
    },
    attributes: {
      image: {
        url: '../../../assets/icons/filter_alt_black_24dp.svg',
        scale: 0.5,
      },
      x: _x,
      text: { content: type },
    },
  });
  private ObjJoinNode = (name: String, _x: Number, type: String) => ({
    id: name,
    data: {
      name: 'process-join',
      type: 'join',
      dataset: '',
      joinType: '',
      rightKey: '',
      leftKey: '',
    },
    attributes: {
      image: {
        url: '../../../assets/icons/library_add_black_24dp.svg',
        scale: 0.5,
      },
      x: _x,
      text: { content: type },
    },
  });
  private ObjAggNode = (name: String, _x: Number, type: String) => ({
    id: name,
    data: {
      name: 'process-aggregate',
      type: 'aggregate',
      column: '',
      operation: '',
      outputName: '',
      groupColumns: [''],
    },
    attributes: {
      image: {
        url: '../../../assets/icons/widgets_black_24dp.svg',
        scale: 0.5,
      },
      x: _x,
      text: { content: type },
    },
  });
  deleteNodes = (node: any) => {
    let adj = node.getAdjacentNodes().get(0).getId();
    let adj2 = node.getAdjacentNodes().get(1).getAdjacentNodes().get(0).getId();
    if (adj2 === node.getId()) {
      adj2 = node.getAdjacentNodes().get(1).getAdjacentNodes().get(1).getId();
    }
    let add = node.getAdjacentNodes().get(1).getId();
    if (adj && adj2) {
      this.ogma.addEdge({
        id: this.edgeId,
        source: adj,
        target: adj2,
      });
      this.edgeId++;
    }
    this.ogma.removeNode(add);
  };
  ngInitFunc(): void {
    this.ogma.addNode({
      id: 'selectSrc',
      data: { name: 'Source' },
      attributes: {
        image: {
          url: '../../../assets/icons/add_circle_black_24dp.svg',
          scale: 0.5,
        },
        x: 0,
        text: { content: 'add source' },
      },
    });
    this.ogma.styles.addRule({
      nodeAttributes: function (node: any) {
        if (node.getData('name') === 'add') {
          return {
            radius: 20,
            color: 'transparent',
            shape: 'circle',
            y: 0,
          };
        }
        return {
          radius: 30,
          shape: 'square',
          color: '#F3F3F3',
          outerStroke: 'transparent',
          innerStroke: '#0675C1',
          y: 0,
          text: { color: '#0675C1' },
        };
      },
    });
  }

  tempFuncAddSrc(sourceName: String): void {
    this.ogma.setGraph({
      nodes: [
        this.ObjCmnNode(
          'source',
          '../../../assets/icons/folder_black_24dp.svg',
          sourceName,
          -100
        ),
        this.ObjCmnNode(
          'selectDis',
          '../../../assets/icons/add_circle_black_24dp.svg',
          'add-Destination',
          100
        ),
      ],
      edges: [{ id: 1, source: 'source', target: 'selectDis' }],
    });
  }

  tempFuncAddDis(disName: String): void {
    this.ogma.removeNode('selectDis');
    this.addId++;
    this.ogma.addNode(this.ObjAddNode('add-' + this.addId, 0));
    this.ogma.addNode(
      this.ObjCmnNode(
        'destination',
        '../../../assets/icons/folder_black_24dp.svg',
        disName,
        100
      )
    );
    this.ogma.addEdges([
      { id: this.edgeId, source: 'source', target: 'add-1' },
      { id: this.edgeId + 1, source: 'add-1', target: 'destination' },
    ]);
    this.edgeId += 3;
  }

  public addNodeBetween(
    src: String,
    dist: String,
    type: String,
    idAdd: String
  ): void {
    this.ogma.removeNode(idAdd);
    let random = Math.ceil(Math.random() * 100 * 33 + 1);
    let nameFilter = 'filterNode-' + random;
    let nameAgg = 'aggregateNode-' + random;
    let nameJoin = 'joinNode-' + random;
    let xSrc = this.ogma.getNode(src).getAttribute('x');

    this.ogma
      .getNode(src)
      .setAttributes({ x: xSrc - 178 + Math.random() * 50 });
    this.ogma
      .getNode(dist)
      .setAttributes({ x: xSrc + 178 + Math.random() * 50 });

    this.ogma.addNode(
      this.ObjAddNode(`add-${this.addId}`, xSrc - 94 + Math.random() * 22)
    );

    this.ogma.addEdge({
      id: this.edgeId,
      source: src,
      target: `add-${this.addId}`,
    });
    this.edgeId += 2;
    let node, name;
    let x = xSrc + Math.random() * 22;

    if (type === 'filter') {
      node = this.ObjFilterNode(nameFilter, x, type);
      name = nameFilter;
    } else if (type === 'aggregate') {
      node = this.ObjAggNode(nameAgg, x, type);
      name = nameAgg;
    } else {
      node = this.ObjJoinNode(nameJoin, x, type);
      name = nameJoin;
    }

    this.ogma.addNode(node);
    this.ogma.addEdge({
      id: this.edgeId,
      source: `add-${this.addId}`,
      target: name,
    });
    this.addId += 3;
    this.edgeId += 2;
    this.ogma.addNode(
      this.ObjAddNode(`add-${this.addId}`, xSrc + 94 + Math.random() * 22)
    );
    this.ogma.addEdge({
      id: this.edgeId,
      source: name,
      target: `add-${this.addId}`,
    });
    this.edgeId += 2;
    this.ogma.addEdge({
      id: this.edgeId,
      source: `add-${this.addId}`,
      target: dist,
    });
    this.edgeId += 7;
    this.addId += 11;
  }
}
