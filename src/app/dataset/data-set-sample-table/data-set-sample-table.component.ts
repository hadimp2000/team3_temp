import { Component, OnInit } from '@angular/core';
import {DataSetServiceService} from "../../services/data-set-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-data-set-sample-table',
  templateUrl: './data-set-sample-table.component.html',
  styleUrls: ['./data-set-sample-table.component.scss']
})
export class DataSetSampleTableComponent implements OnInit {
  dataSet_Service:DataSetServiceService;
  data:any;
  dataset:any=json.content;
  dataset_keys:any;
  dataset_values:any=[];

  constructor(private dataSetService:DataSetServiceService,private route:ActivatedRoute) {

    this.dataSet_Service=dataSetService;
  }
  ngOnInit(): void {
    this.data=this.dataSet_Service.getDataSet(this.route.snapshot.params['name'])
    this.dataset_keys= this.dataset[0];
    let counter=0;
    for (const obj of this.dataset) {
      if (counter!==0)
        this.dataset_values.push(obj);
      counter++;
    }

  }
}
const json={
  "content": [
    [
      "PersonID",
      "LastName",
      "FirstName",
      "Address",
      "City"
    ],
    [
      "1",
      "Daghyani",
      "Matin",
      "Tehran",
      "Iran"
    ],
    [
      "2",
      "Nzzari",
      "Ali",
      "Tehran2",
      "Iran2"
    ],
    [
      "3",
      "Aghaee",
      "Mohammad",
      "Tehran3",
      "Iran3"
    ],
    [
      "4",
      "Taslime",
      "Sourosh",
      "Tehran4",
      "Iran4"
    ]
  ]
}
