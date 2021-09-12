import { Injectable } from '@angular/core';
import {SendRequestService} from "./send-request-service.service";

@Injectable({
  providedIn: 'root'
})
export class PipelineServiceService {

  constructor() { }

  public async downloadYML(name:string){
    const token=localStorage.getItem('token');
    const init: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
     fetch(`https://localhost:5001/pipeline/yml/download/${name}?token=${token}`, init).then((res) => {
      if (res.ok) {
        window.open(res.url);
        return;
      }
      console.log(res);
      throw res;
    });
  }
}
