import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SendRequestService } from 'src/app/services/send-request-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(private router: Router) {}
  public canActivate(): boolean {
    SendRequestService.sendRequest(
      'https://localhost:5001/users/' + localStorage.getItem('token'),
      true
    ).catch(() => localStorage.clear());
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('/logIn');
      return false;
    }
  }
}
