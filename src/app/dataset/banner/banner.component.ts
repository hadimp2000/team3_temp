import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {query} from "@angular/animations";
import {HttpClient} from "@angular/common/http";
import {DataSetServiceService} from "../../services/data-set-service.service";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  query:string='';
  currentSearchTerm = new BehaviorSubject<string>('');
  element_data:any=[];

  constructor(
    private router:Router,
    private httpClient:HttpClient,
    private dataSetService:DataSetServiceService
  ) {}

  ngOnInit(): void {
    this.currentSearchTerm.subscribe((current) => (this.query = current));
  }

  search(value: any) {
    console.log(value.query);
    let element_data= this.dataSetService.getDataSets().filter((data)=> data.name===value.query);
    console.log(element_data[0].name);
    // this.router.navigate(['/dataSet', value.query]);
  }
  public fileChange(event:any) {
    let files:any;
    if (event.target!==null) {
      // @ts-ignore
      files = (event.target as HTMLInputElement).files[0];
    }
    if (files && files.length > 0) {
      let file = files[0];
      let formData = new FormData();
      formData.append('file', file);
      this.httpClient.post('url',formData).subscribe(res => console.log('File Uploaded ...'));
    }
  }
}
