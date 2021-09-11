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
export class DataSetTableComponent implements OnInit{
  dataSource:any;
  selection:any;
  datas:any;

  elements:any;

  constructor(
    private router:Router,
    private elementRef:ElementRef,
    private dataSetService:DataSetServiceService
    ) {}

  async ngOnInit() {
     this.dataSetService = new DataSetServiceService();
     this.dataSource = new MatTableDataSource( await this.dataSetService.getAllDataSets());
     this.selection = new SelectionModel(true, []);
     this.datas = this.dataSetService.getAllDataSets();

   }



  displayedColumns: string[] = ['select', 'position', 'name', 'symbol','delete'];

  notShowSample:boolean=false;
  @Output() sampleIcon: EventEmitter<string> = new EventEmitter<string>();

   async sampleIconClick(event:any){
     const dom:HTMLElement = this.elementRef.nativeElement;
     this.elements = dom.getElementsByClassName((event.target as Element).classList[1]);
     let name=this.elements[2].innerText.trim();

    this.sampleIcon.emit('clicked');
    await this.router.navigateByUrl('pipelines/dataSet/'+name);
  }



















  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected():boolean  {
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
