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
      img: '',
      git: 'https://github.com/Perriex',
    },
    {
      name: 'پارمیدا خانی',
      job: 'توسعه فرانت اند',
      img: '',
      git: 'https://github.com/parmida-khani',
    },
    {
      name: 'هادی مرادی',
      job: 'توسعه فرانت اند',
      img: '',
      git: 'https://github.com/hadimp2000',
    },
    {
      name: 'متین داغیانی',
      job: 'توسعه بک اند',
      img: '',
      git: 'https://github.com/mtndaghyani',
    },
    {
      name: 'پاشا منتصری',
      job: 'توسعه بک اند',
      img: '',
      git: 'https://github.com/Kalam132',
    },
    { name: 'محمد مشتاقی فر', job: 'توسعه بک اند', img: '' },
    {
      name: 'علی نظری',
      job: 'توسعه بک اند',
      img: '',
      git: 'https://github.com/nazari02105',
    },
    {
      name: 'ادیب رضایی',
      job: 'توسعه بک اند',
      img: '',
      git: 'https://github.com/Adib-Rezaei',
    },
    {
      name: 'نوید نادرطهرانی',
      job: 'توسعه بک اند',
      img: '',
      git: 'https://github.com/navidnt',
    },
  ];
  ngOnInit(): void {
    this._toaster.openSnackBar('به سایت تلند تیم سه خوش آمدید', 'talent');
  }
}
