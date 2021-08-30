import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {SignUpModel} from "../models";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  public email: string = '';
  public password: string = '';
  public username: string = '';
  public firstName: string = '';
  public lastName: string = '';

  constructor(
    private router: Router
  ) {
  }

  register(formValues: any) {
    const user: SignUpModel = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
    };
    // this.fetchDataService.signUpSubmit(user).subscribe(
    //   async (result) => {
    //     await this.router.navigateByUrl('/signIn');
    //   },
    //   (response) => {
    //     alert(response.error.message);
    //   }
    // );
  }

}