import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public username:string="parmida-khani";
  public firstName:string="parmida";
  public lastName:string="khani"
  constructor() {}

  ngOnInit(): void {}
  public myFunction() {
    // document.getElementById("myDropdown").classList.toggle("show");
  }
}
