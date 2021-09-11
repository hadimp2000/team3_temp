import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SendRequestService} from "./send-request-service.service";
import {SignUpModel} from "../identify/models";

@Injectable({
  providedIn: 'root'
})
export class FetchUserDataService {
  constructor(private http: HttpClient) {
  }

  public signUpSubmit(user: SignUpModel) {
    const options = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    };
    return this.http.post<any>(
      'https://localhost:5001/users/signup',
      JSON.stringify(user),
      options
    );
  }

  public signInSubmit<T>(user: T) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
      }),
    };
    return this.http.post<any>(
      'https://localhost:5001/users/login',
      JSON.stringify(user),
      options
    );
  }

  async fetchUsername(id: number) {
    const {user} = await SendRequestService.sendRequest(
      `https://songs.code-star.ir/user/one/${id}`, true
    );
    localStorage.setItem("user", JSON.stringify(user));
  }


}
