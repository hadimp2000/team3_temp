import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/common/toast.service';
import { FetchUserDataService } from '../../services/fetch-user-data-service.service';
import { SignInModel_username } from '../models/signIn.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  public email: string = '';
  public password: string = '';
  public username: string = '';

  constructor(
    private fetchDataService: FetchUserDataService,
    private router: Router,
    private _toaster: ToastService
  ) {}

  public login(formValues: any) {
    const user_username: SignInModel_username = {
      username: formValues.email,
      password: formValues.password,
    };
    this.fetchDataService.signInSubmit(user_username).subscribe(
      async (result) => {
        localStorage.setItem('username', formValues.email);
        localStorage.setItem('token', result.token);
        await this.fetchDataService.fetchUsername(result.token);
        await this.router.navigateByUrl('/pipelines/dataSet');
      },
      (response) => {
        this._toaster.openSnackBar(response.error, 'server');
      }
    );
  }
}
