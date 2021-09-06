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
  // public dataset: object[] = [
  //   {
  //     iso_code1: "AFG",
  //     iso_code2: "AFG",
  //     iso_code3: "AFG",
  //     iso_code4: "AFG",
  //     iso_code5: "AFG",
  //     iso_code6: "AFG",
  //     iso_code7: "AFG",
  //     iso_code8: "AFG",
  //     iso_code9: "AFG",
  //     continent: "asia",
  //     location: "afghanistan",
  //     date: "2020-02-24",
  //     total_cases: "1.0",
  //     new_cases: "1.0",
  //     total_deaths: "0",
  //     new_deaths: "0",
  //     population: "128783826"
  //   },
  //   {
  //     iso_code1: "AFG",
  //     iso_code2: "AFG",
  //     iso_code3: "AFG",
  //     iso_code4: "AFG",
  //     iso_code5: "AFG",
  //     iso_code6: "AFG",
  //     iso_code7: "AFG",
  //     iso_code8: "AFG",
  //     iso_code9: "AFG",      continent: "asia",
  //     location: "afghanistan",
  //     date: "2020-02-24",
  //     total_cases: "1.0",
  //     new_cases: "1.0",
  //     total_deaths: "0",
  //     new_deaths: "0",
  //     population: "128783826"
  //   },
  //   {
  //     iso_code1: "AFG",
  //     iso_code2: "AFG",
  //     iso_code3: "AFG",
  //     iso_code4: "AFG",
  //     iso_code5: "AFG",
  //     iso_code6: "AFG",
  //     iso_code7: "AFG",
  //     iso_code8: "AFG",
  //     iso_code9: "AFG",      continent: "asia",
  //     location: "afghanistan",
  //     date: "2020-02-24",
  //     total_cases: "1.0",
  //     new_cases: "1.0",
  //     total_deaths: "0",
  //     new_deaths: "0",
  //     population: "128783826"
  //   },
  //   {
  //     iso_code1: "AFG",
  //     iso_code2: "AFG",
  //     iso_code3: "AFG",
  //     iso_code4: "AFG",
  //     iso_code5: "AFG",
  //     iso_code6: "AFG",
  //     iso_code7: "AFG",
  //     iso_code8: "AFG",
  //     iso_code9: "AFG",      continent: "asia",
  //     location: "afghanistan",
  //     date: "2020-02-24",
  //     total_cases: "1.0",
  //     new_cases: "1.0",
  //     total_deaths: "0",
  //     new_deaths: "0",
  //     population: "128783826"
  //   },
  //   {
  //     iso_code1: "AFG",
  //     iso_code2: "AFG",
  //     iso_code3: "AFG",
  //     iso_code4: "AFG",
  //     iso_code5: "AFG",
  //     iso_code6: "AFG",
  //     iso_code7: "AFG",
  //     iso_code8: "AFG",
  //     iso_code9: "AFG",      continent: "asia",
  //     location: "afghanistan",
  //     date: "2020-02-24",
  //     total_cases: "1.0",
  //     new_cases: "1.0",
  //     total_deaths: "0",
  //     new_deaths: "0",
  //     population: "128783826"
  //   }
  // ]
  // public dataset_keys!: string[];
  // public dataset_values: string[][]=[];
  // public dataName:string="Covid data";
  constructor(private dataSetService:DataSetServiceService,private route:ActivatedRoute) {
    // this.dataset_keys= Object.keys(this.dataset[0]);
    // for (const obj of this.dataset) {
    //   this.dataset_values.push(Object.values(obj));
    // }
    this.dataSet_Service=dataSetService;
  }
  ngOnInit(): void {
    this.data=this.dataSet_Service.getDataSet(this.route.snapshot.params['name'])
  }
}
