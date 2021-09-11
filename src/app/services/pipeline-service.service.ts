import { Injectable } from '@angular/core';
import {SendRequestService} from "./send-request-service.service";

@Injectable({
  providedIn: 'root'
})
export class PipelineServiceService {

  constructor() { }

  public async downloadYML(name:string){
    const token=localStorage.getItem('token');
    await SendRequestService.sendRequest(`https://localhost:5001/pipeline/yml/download/${name}?token=${token}`,true);
  }
}
