import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FetchUserDataService} from "../../services/fetch-user-data-service.service";
import {signInModel_email, SignInModel_username} from "../models/signIn.model";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  public email: string = '';
  public password: string = '';
  public username: string = '';

  constructor(
    private fetchDataService: FetchUserDataService,
    private router: Router
  ) {
  }

  public validateEmail(info: string): boolean {
    const response =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return response.test(String(info).toLowerCase());
  }

  public login(formValues: any) {

      const user_username: SignInModel_username = {
        username: formValues.email,
        password: formValues.password,
      };
      this.fetchDataService.signInSubmit(user_username).subscribe(

        async (result) => {
          localStorage.setItem('username',formValues.email);
          localStorage.setItem('token', result.token);
          await this.fetchDataService.fetchUsername(result.token);
          await this.router.navigateByUrl('/pipelines/dataSet');
        },
        (response) => {
          alert(response.error.message);
        }
      );

  }
}
