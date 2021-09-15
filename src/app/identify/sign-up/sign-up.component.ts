import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpModel } from '../models';
import { FetchUserDataService } from '../../services/fetch-user-data-service.service';
import { ToastService } from 'src/app/common/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public email: string = '';
  public password: string = '';
  public username: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public isWait = false;
  constructor(
    private fetchDataService: FetchUserDataService,
    private router: Router,
    private _toaster: ToastService
  ) {}

  register(formValues: any) {
    const user: SignUpModel = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
    };
    this.isWait = true;
    this.fetchDataService.signUpSubmit(user).subscribe(
      async () => {
        await this.router.navigateByUrl('/logIn');
      },
      (response) => {
        this._toaster.openSnackBar(response.error.message, 'server');
      }
    );
  }
}
