import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss'],
})
export class LandingHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let btn = document.getElementById('toggleMenu');
    if (btn) btn.style.opacity = '0';
  }

  public toggleMenu(): void {
    let btn = document.getElementById('toggleMenu');
    if (btn) btn.style.opacity = btn.style.opacity === '0' ? '1' : '0';
  }
}
