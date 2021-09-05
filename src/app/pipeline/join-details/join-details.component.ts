import {Component, Input, OnInit} from '@angular/core';
import {FilterDetailsModel} from "../filter-page/filter-details.model";
import {JoinDetailsModel} from "./join-details.model";

@Component({
  selector: 'app-join-details',
  templateUrl: './join-details.component.html',
  styleUrls: ['./join-details.component.scss']
})
export class JoinDetailsComponent implements OnInit {
  @Input() join_details!: JoinDetailsModel;
  public joinName:string='join1';
  public datasets:string[]=['covid','email','marketing'];
  public table1_columns:string[]=['x','y','z'];
  public table2_columns:string[]=['a','b','c'];

  constructor() { }

  ngOnInit(): void {
  }

  public saveJoin(formValues:any){
    console.log(formValues)
  }

}
