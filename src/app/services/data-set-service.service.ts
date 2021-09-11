import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SendRequestService} from "./send-request-service.service";


@Injectable({
  providedIn: 'root'
})
export class DataSetServiceService implements OnInit {

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


  async getAllDataSets(): Promise<object[]> {
    const {csvFiles} = await SendRequestService.sendRequest(
      `https://localhost:5001/users/${localStorage.getItem('username')}/csvs`,
      true,

    )
    let dataSets: object[]=[];

    for (const csv of csvFiles) {
      dataSets.push({
          position: dataSets.length + 1,
          name: csv,
          symbol: '',
          deleteIcon: ''
        }
      )
    }
    return dataSets;
  }

  async getCsvDataSet(name:string):Promise<object[]>{
    const details={
      filename:name,
      token:localStorage.getItem('token')
    }
    const {dataSet}=await SendRequestService.sendRequest(
      `https://localhost:5001/dataset/csv/${name}?token=${details.token}`,
      true
    )
    return dataSet;
  }

}



// export const dataSets = [
//   {position: 1, name: 'Hydrogen',  symbol: '',deleteIcon:''},
//   {position: 2, name: 'Helium', symbol: '',deleteIcon:''},
//   {position: 3, name: 'Lithium', symbol: '',deleteIcon:''},
// ];
