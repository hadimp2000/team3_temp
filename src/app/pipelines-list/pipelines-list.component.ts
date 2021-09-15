import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { DataSetServiceService } from '../services/data-set-service.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pipelines-list',
  templateUrl: './pipelines-list.component.html',
  styleUrls: ['./pipelines-list.component.scss'],
})
export class PipelinesListComponent implements OnInit {
  dataSetService: any;
  dataSource: any;
  selection: any;
  pipelines: any;
  httpClient: any;
  elements: any;
  isLoading = true;
  constructor(
    dataSetService: DataSetServiceService,
    private router: Router,
    elementRef: ElementRef,
    httpClient: HttpClient
  ) {}

  async ngOnInit() {
    this.dataSetService = new DataSetServiceService();
    this.pipelines = await this.dataSetService
      .getAllPipelines()
      .then((res: any) => {
        this.isLoading = false;
        return res;
      });
    this.dataSource = new MatTableDataSource(this.pipelines);
    // this.dataSource.push(this.dataSetService.createData("pipeline",this.dataSource.length+1))
    this.selection = new SelectionModel(true, []);
    // this.datas=this.dataSetService.getDataSets();
  }

  async createpipeline() {
    await this.dataSetService.createPipeline();
  }

  deletepipeline(i: number) {
    let name = this.pipelines[i].name;
    this.dataSetService.deletePipeline(name);
  }

  navigateToPipeline(num: number) {
    let name = this.pipelines[num].name;
    this.router.navigateByUrl(`/pipeline/${name}`);
  }

  displayedColumns: string[] = ['select', 'position', 'name', 'delete'];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
