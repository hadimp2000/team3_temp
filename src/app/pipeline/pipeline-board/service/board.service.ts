import { Injectable } from '@angular/core';
import { AddDataModalComponent } from '../modals/add-data-modal/add-data-modal.component';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public ogma: any;
  private addId = 0;
  private distNode: any;
  private edgeId = 0;
  constructor(public _addDataModal: AddDataModalComponent) {}
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
  ngInitFunc(): void {
    this.ogma.addNode({
      id: 'selectSrc',
      data: { name: 'Source' },
      attributes: {
        image: {
          url: '../../../assets/icons/add_circle_black_24dp.svg',
          scale: 0.5,
        },
        x: -300,
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
            y: -200,
          };
        }
        return {
          radius: 30,
          shape: 'square',
          color: 'white',
          outerStroke: 'transparent',
          innerStroke: 'grey',
          y: -200,
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
          this.addNodeBetween(
            i.get(0).getId(),
            i.get(1).getId(),
            'filter',
            evt.target.getId()
          );
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
        {
          id: 'source',
          data: { name: sourceName },
          attributes: {
            image: {
              url: '../../../assets/icons/folder_black_24dp.svg',
              scale: 0.5,
            },
            x: -100,
            text: { content: sourceName },
          },
        },
        {
          id: 'selectDis',
          data: { name: 'Destination' },
          attributes: {
            image: {
              url: '../../../assets/icons/add_circle_black_24dp.svg',
              scale: 0.5,
            },
            x: -100,
            text: { content: 'add Destination' },
          },
        },
      ],
      edges: [{ id: 1, source: 'source', target: 'selectDis' }],
    });
  }

  tempFuncAddDis(disName: String): void {
    this.ogma.removeNode('selectDis');
    this.addId++;
    this.ogma.addNode({
      id: 'add-' + this.addId,
      data: { name: 'add' },
      attributes: {
        image: {
          url: '../../../assets/icons/add_circle_black_24dp.svg',
          scale: 0.5,
        },
        x: -100,
        text: { content: 'add process' },
        shape: 'circle',
      },
    });
    this.distNode = this.ogma.addNode({
      id: 'destination',
      data: { name: disName },
      attributes: {
        image: {
          url: '../../../assets/icons/folder_black_24dp.svg',
          scale: 0.5,
        },
        x: -100,
        text: { content: disName },
      },
    });
    console.log(this.distNode);
    this.ogma.addEdges([
      { id: this.edgeId, source: 'source', target: 'add-1' },
      { id: this.edgeId + 1, source: 'add-1', target: 'destination' },
    ]);
    this.edgeId += 3;
  }

  addNodeBetween(src: String, dist: String, type: String, idAdd: String): void {
    this.ogma.removeNode(idAdd);
    let nameFilter = 'filterNode-' + Math.random() * 100 * 33 + 1;

    this.ogma.addNode({
      id: `add-${this.addId}`,
      data: { name: 'add' },
      attributes: {
        image: {
          url: '../../../assets/icons/add_circle_black_24dp.svg',
          scale: 0.5,
        },
        x: -100,
        text: { content: 'add process' },
        shape: 'circle',
      },
    });
    this.ogma.addEdge({
      id: this.edgeId,
      source: src,
      target: `add-${this.addId}`,
    });

    this.edgeId += 2;

    this.ogma.addNode({
      id: nameFilter,
      data: { name: 'process' },
      attributes: {
        image: {
          url: '../../../assets/icons/filter_alt_black_24dp.svg',
          scale: 0.5,
        },
        x: -100,
        text: { content: type },
      },
    });

    this.ogma.addEdge({
      id: this.edgeId,
      source: `add-${this.addId}`,
      target: nameFilter,
    });

    this.addId += 3;
    this.edgeId += 2;
    this.ogma.addNode({
      id: `add-${this.addId}`,
      data: { name: 'add' },
      attributes: {
        image: {
          url: '../../../assets/icons/add_circle_black_24dp.svg',
          scale: 0.5,
        },
        x: -100,
        text: { content: 'add process' },
        shape: 'circle',
      },
    });

    this.ogma.addEdge({
      id: this.edgeId,
      source: nameFilter,
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
    this.distNode.setAttributes({ x: -100 });
  }
}
