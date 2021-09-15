import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public username!: string | null;
  public firstName: string = 'parmida';
  public lastName: string = 'khani';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }
  public async logOut() {
    localStorage.clear();
    await this.router.navigateByUrl('/');
  }
}
