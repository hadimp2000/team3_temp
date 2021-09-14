import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {DataSetServiceService} from "../../services/data-set-service.service";


@Component({
  selector: 'app-data-set-table',
  templateUrl: './data-set-table.component.html',
  styleUrls: ['./data-set-table.component.scss']
})
export class DataSetTableComponent implements OnInit {
  dataSource: any;
  selection: any;
  datas: any;

  elements: any;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private dataSetService: DataSetServiceService
  ) {
  }

  async ngOnInit() {
    this.dataSetService = new DataSetServiceService();
    this.datas = await this.dataSetService.getAllDataSets();
    this.dataSource = new MatTableDataSource(this.datas);
    this.selection = new SelectionModel(true, []);

  }

  async deleteDataSet(i: number) {
    let name = this.datas[i].name
    if(this.datas[i].symbol!=='csv')
      await this.dataSetService.deleteSqlDataSet(name);
   else
      await this.dataSetService.deleteCsvDataSet(name);
    location.reload();
  }

  displayedColumns: string[] = ['select', 'position', 'name', 'symbol', 'delete'];
  notShowSample: boolean = false;
  @Output() sampleIcon: EventEmitter<string> = new EventEmitter<string>();

  async sampleIconClick(num: number) {
    let name = this.datas[num].name;
    this.sampleIcon.emit('clicked');
    if (this.datas[num].symbol!=='csv'){

      await this.router.navigateByUrl('pipelines/dataSet/*' + name);
    }
    else
      await this.router.navigateByUrl('pipelines/dataSet/' + name);
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
