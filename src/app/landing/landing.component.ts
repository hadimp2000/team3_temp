import { Component, OnInit } from '@angular/core';
import { ToastService } from '../common/toast.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private _toaster: ToastService) {}
  public arryOfInfos: Array<any> = [
    {
      name: 'پرنا اسدی',
      job: 'توسعه فرانت اند',
      img: '../../assets/images/parna.jpg',
      git: 'https://github.com/Perriex',
    },
    {
      name: 'هادی مرادی',
      job: 'توسعه فرانت اند',
      img: '../../assets/images/hadi.jpg',
      git: 'https://github.com/hadimp2000',
    },
    {
      name: 'پارمیدا خانی',
      job: 'توسعه فرانت اند',
      img: '../../assets/images/parmida.jpg',
      git: 'https://github.com/parmida-khani',
    },
    {
      name: 'علی نظری',
      job: 'توسعه بک اند',
      img: '../../assets/images/ali.jpg',
      git: 'https://github.com/nazari02105',
    },

    {
      name: 'پاشا منتصری',
      job: 'توسعه بک اند',
      img: '../../assets/images/default-profile.jpg',
      git: 'https://github.com/Kalam132',
    },
    {
      name: 'متین داغیانی',
      job: 'توسعه بک اند',
      img: '../../assets/images/matin.jpg',
      git: 'https://github.com/mtndaghyani',
    },
    {
      name: 'نوید نادرطهرانی',
      job: 'توسعه بک اند',
      img: '../../assets/images/navid.jpg',
      git: 'https://github.com/navidnt',
    },
  ];
  ngOnInit(): void {
    this._toaster.openSnackBar('به سایت تلند تیم سه خوش آمدید', 'talent');
  }
}
