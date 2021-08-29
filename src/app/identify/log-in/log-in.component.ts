import { Component } from '@angular/core';
import {Router} from "@angular/router";

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
    private router: Router
  ) {
  }

  public validateEmail(info: string): boolean {
    const response =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return response.test(String(info).toLowerCase());
  }

  public login(formValues: any) {
    // if (this.validateEmail(formValues.email)) {
    //   const user_email: signInModel_email = {
    //     email: formValues.email,
    //     password: formValues.password,
    //   };
    //   this.fetchDataService.signInSubmit(user_email).subscribe(
    //     async (result) => {
    //       localStorage.setItem('token', result.token);
    //       await this.fetchDataService.fetchUsername(result.id);
    //       await this.router.navigateByUrl('/user');
    //     },
    //     (response) => {
    //       alert(response.error.message);
    //     }
    //   );
    // } else {
    //   const user_username: SignInModel_username = {
    //     username: formValues.email,
    //     password: formValues.password,
    //   };
    //   this.fetchDataService.signInSubmit(user_username).subscribe(
    //     async (result) => {
    //       localStorage.setItem('token', result.token);
    //       await this.fetchDataService.fetchUsername(result.id);
    //       await this.router.navigateByUrl('/user');
    //     },
    //     (response) => {
    //       alert(response.error.message);
    //     }
    //   );
    // }
  }
}
