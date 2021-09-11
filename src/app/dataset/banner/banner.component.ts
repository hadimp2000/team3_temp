import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {query} from "@angular/animations";
import {HttpClient} from "@angular/common/http";
import {DataSetServiceService} from "../../services/data-set-service.service";
import {SendRequestService} from "../../services/send-request-service.service";

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
    private dataSetService:DataSetServiceService,
    private sendRequestService:SendRequestService
  ) {}

  ngOnInit(): void {
    this.currentSearchTerm.subscribe((current) => (this.query = current));
  }

  // async search(value: any) {
  //   console.log(value.query);
  //   let element_data= this.dataSetService.getDataSets().filter((data:any)=> data.name===value.query);
  //
  //   // this.router.navigate(['/dataSet', value.query]);
  // }
   async fileChange(event:any) {
    let files:FileList | null;
    let details:any;
    if (event.target!==null) {

      files = (event.target as HTMLInputElement).files;


      if (files && files.length > 0) {
        let file = files[0];
        let formData = new FormData();
        details = {
          Name: file.name,
          ColDelimiter: ',',
          RowDelimiter: 'newline',
          HasHeader: 'true'
        }
        formData.append('details', JSON.stringify(details));
        formData.append('file', file);
        // let response=await SendRequestService.sendRequest(`https://localhost:5001/dataset/csv/create?token=${localStorage.getItem('token')}`, false, formData);
        this.httpClient.post(`https://localhost:5001/dataset/csv/create?token=${localStorage.getItem('token')}`,formData).subscribe(res => console.log('File Uploaded ...'));
        location.reload();
      }
    }
  }
}
