import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {DataSetServiceService} from "../services/data-set-service.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-pipelines-list',
  templateUrl: './pipelines-list.component.html',
  styleUrls: ['./pipelines-list.component.scss']
})
export class PipelinesListComponent implements OnInit {

  dataSetService:any;
  dataSource:any;
  selection:any;
  datas:any;
  httpClient:any;
  elements:any;
  elementRef:ElementRef;

  constructor(dataSetService:DataSetServiceService,private router:Router, elementRef:ElementRef,httpClient:HttpClient) {
    this.dataSetService=dataSetService;
    this.elementRef=elementRef;
    this.httpClient=httpClient;

  }

  ngOnInit() {

    this.datas=this.dataSetService.getDataSets();
    this.dataSetService=new DataSetServiceService();
    this.dataSource = new MatTableDataSource(this.datas);
    // this.dataSource.push(this.dataSetService.createData("pipeline",this.dataSource.length+1))
    this.selection = new SelectionModel(true, []);
    // this.datas=this.dataSetService.getDataSets();

  }

  createPipeline(){
    this.datas.push(this.dataSetService.createData("pipeline"+(this.datas.length+1),this.datas.length+1))
    this.dataSource = new MatTableDataSource(this.datas);
  }
  removePipeline(){

  }

  displayedColumns: string[] = ['select', 'position', 'name','delete'];




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
  checkboxLabel(row?:any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
