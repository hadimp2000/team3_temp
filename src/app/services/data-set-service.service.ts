import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SendRequestService} from "./send-request-service.service";


@Injectable({
  providedIn: 'root'
})
export class DataSetServiceService implements OnInit {
  dataSets:object[]=[];
  pipeLines:object[]=[];


  constructor() {
  }

  async ngOnInit() {
  }

  createData(name: string, position: number) {
    return {
      name: name,
      position: position,
      symbol: '',
      deleteIcon: ''
    }

  }


  async getAllCsvDataSets(): Promise<object[]> {
    const {csvFiles} = await SendRequestService.sendRequest(
      `https://localhost:5001/users/${localStorage.getItem('username')}/csvs`,
      true,

    )
    for (const csv of csvFiles) {
      this.dataSets.push({
          position: this.dataSets.length + 1,
          name: csv,
          symbol: '',
          deleteIcon: ''
        }
      )
    }
    return this.dataSets;
  }

  async getCsvDataSet(name:string):Promise<any[]>{
    const {content}=await SendRequestService.sendRequest(
      `https://localhost:5001/dataset/csv/${name}?token=${localStorage.getItem('token')}`,
      true
    )
    return content;
  }
  async deleteCsvDataSet(name:string){
    let response=await SendRequestService.sendRequest(
      `https://localhost:5001/dataset/csv/delete/${name}?token=${localStorage.getItem('token')}`,
      false
    )

  }

  async getAllPipelines():Promise<any[]>{
    const {pipelines} = await SendRequestService.sendRequest(
      `https://localhost:5001/users/${localStorage.getItem('username')}/pipelines`,
      true,
    )
    for (const pipeline of pipelines) {
      this.pipeLines.push({
          position: this.pipeLines.length + 1,
          name: pipeline,
          deleteIcon: ''
        }
      )
    }
    return this.pipeLines;
  }

  async createPipeline(){
    let details:any;
    if(this.pipeLines.length==0){
      details={
        name:`pipeline 1`,
        content:''
      }
    }else{
      // @ts-ignore
      let name=this.pipeLines[this.pipeLines.length-1].name;
      let number= parseInt(name.substr(name.length-1)) ;
      details={
        name: `pipeline ${number+1}`,
        content:''
      }
    }

    await SendRequestService.sendRequest(
      `https://localhost:5001/pipeline/create?token=${localStorage.getItem('token')}`,
      true,
      details
    )
    location.reload();
  }

  async deletePipeline(name:string):Promise<any>{
    return await SendRequestService.sendRequest(
      `https://localhost:5001/pipeline/delete/${name}?token=${localStorage.getItem('token')}`,
      true
    )
  }


  }



