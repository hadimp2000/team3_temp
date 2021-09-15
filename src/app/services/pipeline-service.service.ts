import {Injectable} from '@angular/core';
import {SendRequestService} from "./send-request-service.service";

@Injectable({
  providedIn: 'root'
})
export class PipelineServiceService {

  constructor() {
  }

  public async downloadYML(name: string) {
    const token = localStorage.getItem('token');
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
      throw res;
    });
  }

  public async getStatus(name: string): Promise<string> {
    const token = localStorage.getItem('token');
    const response = await SendRequestService.sendRequest(`https://localhost:5001/pipeline/${name}/status?token=${token}`, true);
    return response.status;
  }

  public async updatePipeline(body: any) {
    const token = localStorage.getItem('token');
    const init: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    };
    fetch(`https://localhost:5001/pipeline/create?token=${token}`, init).then(
      (res) => {
        if (res.ok) {
          return;
        }
        throw res;
      }
    );
  }

  public async getPipeline(name: String) {
    const token = localStorage.getItem('token');
    const init: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = await SendRequestService.sendRequest(
      `https://localhost:5001/pipeline/${name}?token=${token}`,
      true
    ).catch(() => {
      return {};
    });
    return data;
  }

  public async run(dest: string, name: string) {
    const token = localStorage.getItem('token');
    const data = {
      nodeId: dest,
      name: name
    }
    const res = await SendRequestService.sendRequest(`https://localhost:5001/pipeline/run?token=${token}`, true, data)
  }

  public async cancel() {
    const token = localStorage.getItem('token');
    const res = await SendRequestService.sendRequest(`https://localhost:5001/pipeline/cancel?token=${token}`, true)
    console.log(res);
  }
}
