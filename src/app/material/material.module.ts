import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


const MaterialComponents=[
  MatTableModule,
  MatButtonModule,
  MatGridListModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule

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
