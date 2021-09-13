import { Injectable } from '@angular/core';
import { AddDataModalComponent } from '../pipeline-board/modals/add-data-modal/add-data-modal.component';
import { AddProcessModalComponent } from '../pipeline-board/modals/add-process-modal/add-process-modal.component';
import { PipelineServiceService } from 'src/app/services/pipeline-service.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public ogma: any;
  private addId = 0;
  private edgeId = 0;
  public pipelineName!: string;
  public sourceName!: String;
  public DistName!: String;
  public graph = '';
  constructor(
    public _addDataModal: AddDataModalComponent,
    public _addProcessModal: AddProcessModalComponent,
    public _pipelineService: PipelineServiceService
  ) {}

  public changeNodeData(nodeId: string, data: object): void {
    const changedNode = this.ogma.getNode(nodeId);
    let preData = changedNode.getData();
    changedNode.setData({
      ...data,
      type: preData.type,
      name: preData.name,
      source: this.pipelineName,
    });
    this.updateDb();
  }

  private ObjAddNode = (id: string) => ({
    id: id,
    data: { name: 'add', type: 'add' },
    attributes: {
      image: {
        url: '../../../assets/icons/add_circle_black_24dp.svg',
        scale: 0.5,
      },
      text: { content: 'add process' },
      shape: 'circle',
    },
  });

  private ObjCmnNode = (id: String, urlImg: String, content: String) => ({
    id: id,
    data: { name: content, type: 'common' },
    attributes: {
      image: {
        url: urlImg,
        scale: 0.5,
      },
      text: { content: content },
    },
  });

  private ObjFilterNode = (name: String, type: String) => ({
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
      text: { content: type },
    },
  });
  private ObjJoinNode = (name: String, type: String) => ({
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

      text: { content: type },
    },
  });
  private ObjAggNode = (name: String, type: String) => ({
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

      text: { content: type },
    },
  });
  updateDb = () => {
    this.ogma.layouts.sequential({
      direction: 'LR',
      locate: { maxNodeSizeOnScreen: 40 },
      componentDistance: 100,
      arrangeComponents: 'singleLine',
      nodeDistance: 200,
    });
    this.ogma.export
      .json({
        download: false,
        pretty: false,
        nodeAttributes: ['image', 'text', 'x'],
      })
      .then((json: any) => {
        this._pipelineService.updatePipeline({
          name: this.pipelineName,
          content: `${json}`,
        });
      });
    this.ogma.export
      .json({
        download: false,
        pretty: true,
        nodeAttributes: ['image', 'text', 'x'],
      })
      .then((json: any) => {
        console.log(json);
      });
  };
  deleteNodes = (node: any) => {
    let adj = node.getAdjacentNodes().get(0);
    let adj2 = node.getAdjacentNodes().get(1);
    console.log(adj.getData('name') === 'add');
    let neighber;
    if (adj.getAdjacentNodes().get(0).getId() === node.getId()) {
      neighber = adj.getAdjacentNodes().get(1);
    } else {
      neighber = adj.getAdjacentNodes().get(0);
    }
    if (adj2 && neighber) {
      this.ogma.addEdge({
        id: this.edgeId,
        source: adj2.getId(),
        target: neighber.getId(),
      });
      this.edgeId++;
    }
    this.ogma.removeNode(adj);
    this.ogma.removeNode(node);
    this.updateDb();
  };
  async ngInitFunc(): Promise<void> {
    const { content } = await this._pipelineService.getPipeline(
      this.pipelineName
    );
    if (content && content !== '{"nodes":[],"edges":[]}') {
      this.ogma.setGraph(JSON.parse(content));
      this.sourceName = this.ogma.getNode('source')?.getData()?.name;
      this.DistName = this.ogma.getNode('destination')?.getData()?.name;
    } else {
      this.ogma.addNode({
        id: 'selectSrc',
        data: { name: 'Source' },
        attributes: {
          image: {
            url: '../../../assets/icons/add_circle_black_24dp.svg',
            scale: 0.5,
          },
          text: { content: 'add source' },
        },
      });
    }
    this.ogma.styles.addRule({
      nodeAttributes: function (node: any) {
        if (node.getData('name') === 'add') {
          return {
            radius: 20,
            color: 'transparent',
            shape: 'circle',
            image: {
              url: '../../../assets/icons/add_circle_black_24dp.svg',
              scale: 0.5,
            },
          };
        }
        return {
          radius: 30,
          shape: 'square',
          color: '#F3F3F3',
          outerStroke: 'transparent',
          innerStroke: '#0675C1',
          text: { color: '#0675C1' },
          image: {
            scale: 0.5,
          },
        };
      },
    });

    this.ogma.styles.setSelectedNodeAttributes({
      color: false,
      outline: false,
      outerStroke: {
        color: '#6643B5',
      },
    });
    this.ogma.styles.setHoveredNodeAttributes({
      color: false,
      outline: false,
      outerStroke: {
        color: '#6643B5',
      },
    });
    this.updateDb();
  }

  tempFuncAddSrc(sourceName: String): void {
    this.sourceName = sourceName;
    this.ogma.setGraph({
      nodes: [
        this.ObjCmnNode(
          'source',
          '../../../assets/icons/folder_black_24dp.svg',
          sourceName
        ),
        this.ObjCmnNode(
          'selectDis',
          '../../../assets/icons/add_circle_black_24dp.svg',
          'add-Destination'
        ),
      ],
      edges: [{ id: 1, source: 'source', target: 'selectDis' }],
    });
    this.updateDb();
  }

  tempFuncAddDis(disName: String): void {
    this.DistName = disName;
    this.ogma.removeNode('selectDis');
    this.addId++;
    this.ogma.addNode(this.ObjAddNode('add-' + this.addId));
    this.ogma.addNode(
      this.ObjCmnNode(
        'destination',
        '../../../assets/icons/folder_black_24dp.svg',
        disName
      )
    );
    this.ogma.addEdges([
      { id: this.edgeId, source: 'source', target: 'add-1' },
      { id: this.edgeId + 1, source: 'add-1', target: 'destination' },
    ]);
    this.edgeId += 3;
    this.updateDb();
  }

  public addNodeBetween(
    src: String,
    dist: String,
    type: String,
    idAdd: String
  ): void {
    this.ogma.removeNode(idAdd);
    let random = Math.ceil(Math.random() * 1627 + 1);
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

    this.ogma.addNode(this.ObjAddNode(`add-${this.addId}`));
    console.log(src, dist);
    this.ogma.addEdge({
      id: this.edgeId,
      source: src,
      target: `add-${this.addId}`,
    });
    this.edgeId += 2;
    let node, name;

    if (type === 'filter') {
      node = this.ObjFilterNode(nameFilter, type);
      name = nameFilter;
    } else if (type === 'aggregate') {
      node = this.ObjAggNode(nameAgg, type);
      name = nameAgg;
    } else {
      node = this.ObjJoinNode(nameJoin, type);
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
    this.ogma.addNode(this.ObjAddNode(`add-${this.addId}`));
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
    this.ogma.layouts.sequential({
      direction: 'LR',
      locate: { maxNodeSizeOnScreen: 40 },
    });
  }
}
