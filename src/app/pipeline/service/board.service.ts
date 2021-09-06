import { Injectable } from '@angular/core';
import { AddDataModalComponent } from '../pipeline-board/modals/add-data-modal/add-data-modal.component';
import { AddProcessModalComponent } from '../pipeline-board/modals/add-process-modal/add-process-modal.component';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public ogma: any;
  private addId = 0;
  private edgeId = 0;
  constructor(
    public _addDataModal: AddDataModalComponent,
    public _addProcessModal: AddProcessModalComponent
  ) {}

  private ObjAddNode = (id: string, x: Number) => ({
    id: id,
    data: { name: 'add' },
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
    data: { name: content },
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
    data: { name: 'process-filter' },
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
    data: { name: 'process-join' },
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
    data: { name: 'process-aggregate' },
    attributes: {
      image: {
        url: '../../../assets/icons/widgets_black_24dp.svg',
        scale: 0.5,
      },
      x: _x,
      text: { content: type },
    },
  });

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
    this.AllOnClickEvents();
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
          color: 'white',
          outerStroke: 'transparent',
          innerStroke: '#0675C1',
          y: 0,
          text: { color: '#0675C1' },
        };
      },
    });
  }

  AllOnClickEvents(): void {
    this.ogma.events.onClick((evt: any) => {
      if (evt.target === null) {
      } else if (evt.target.isNode) {
        if (evt.target.getId() == 'selectSrc') {
          this._addDataModal.openDialog();
          //if seleced returns a name ,then pass to this function
          this.tempFuncAddSrc('name from output modal');
        } else if (evt.target.getId() == 'selectDis') {
          this._addDataModal.openDialog();
          //if seleced returns a name ,then pass to this function
          this.tempFuncAddDis('name from output modal');
        } else if (evt.target.getData('name') === 'add') {
          let i = evt.target.getAdjacentNodes();
          this._addProcessModal.openDialog(this, {
            src: i.get(0).getId(),
            dist: i.get(1).getId(),
            id: evt.target.getId(),
          });
        } else if ('process-filter' === evt.target.getData('name')) {
          //do what needed
        } else {
          console.log('clicked on an edge between ');
        }
      } else {
        var edge = evt.target;
        console.log(
          'clicked on an edge between ',
          edge.getSource().getId(),
          ' and',
          edge.getTarget().getId()
        );
      }
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
    let nameFilter = 'filterNode-' + Math.random() * 100 * 33 + 1;
    let nameAgg = 'aggregateNode-' + Math.random() * 100 * 33 + 1;
    let nameJoin = 'joinNode-' + Math.random() * 100 * 33 + 1;
    let xSrc = this.ogma.getNode(src).getAttribute('x');

    this.ogma
      .getNode(src)
      .setAttributes({ x: xSrc - 178 + Math.random() * 22 });
    this.ogma
      .getNode(dist)
      .setAttributes({ x: xSrc + 178 + Math.random() * 22 });

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
