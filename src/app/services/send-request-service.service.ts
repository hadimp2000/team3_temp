import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendRequestService {
  public static async sendRequest(
    url: string,
    hasJson: boolean,
    body?: object
  ): Promise<any> {
    const init: RequestInit = {
      headers: {
        'content-type': 'application/json',
        'charset':'utf-8',
        'date': 'Tue07 Sep 2021 12:52:08 GMT',
        'server': 'Kestrel',
        'Cache-Control':
          'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0',
      },
    };
    if (body) {
      init.method = 'POST';
      init.body = JSON.stringify(body);
    }
    return fetch(url, init).then((res) => {
      if (res.ok) {
        console.log(res);
        if (hasJson) return res.json();
        return;
      }
      throw res.json();
    });
  }
}
