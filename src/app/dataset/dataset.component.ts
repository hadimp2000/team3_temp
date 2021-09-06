import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {
  showTable:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  showSampleTable(event:any){
    this.showTable=!this.showTable;
  }

}
