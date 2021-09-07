import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DataSetServiceService {

  constructor() { }
  getDataSets(){
    return dataSets;
  }
  getDataSet(name:string):any{
    for (let i = 0; i <dataSets.length ; i++) {
      if(dataSets[i].name===name)
        return dataSets[i];
    }

  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  symbol: string;
  deleteIcon:string;
}

export const dataSets: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen',  symbol: '',deleteIcon:''},
  {position: 2, name: 'Helium', symbol: '',deleteIcon:''},
  {position: 3, name: 'Lithium', symbol: '',deleteIcon:''},


];
