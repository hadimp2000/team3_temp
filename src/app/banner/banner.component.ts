import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {ELEMENT_DATA, PeriodicElement} from "../data-set-table/data-set-table.component";
import {query} from "@angular/animations";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  query:string='';
  currentSearchTerm = new BehaviorSubject<string>('');
  element_data:PeriodicElement[]=[];
  constructor(
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.currentSearchTerm.subscribe((current) => (this.query = current));
  }

  search(value: any) {
    console.log(value.query);
    let element_data= ELEMENT_DATA.filter((data)=> data.name===value.query);
    console.log(element_data[0].name);
    // this.router.navigate(['/dataSet', value.query]);
  }

}
