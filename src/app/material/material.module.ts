import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCheckboxModule} from "@angular/material/checkbox";


const MaterialComponents=[
  MatTableModule,
  MatButtonModule,
  MatGridListModule,
  MatCheckboxModule

]
@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    MaterialComponents
  ]
})
export class MaterialModule { }
