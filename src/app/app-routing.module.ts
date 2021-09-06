import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageComponent} from "./layouts/page/page.component";
import { LandingComponent } from './landing/landing.component';
import {SignUpComponent} from "./identify/sign-up/sign-up.component";
import {LogInComponent} from "./identify/log-in/log-in.component";
import {PipelineComponent} from "./pipeline/pipeline.component";
import {DataSetTableComponent} from "./data-set-table/data-set-table.component";
import {FilterPageComponent} from "./pipeline/filter-page/filter-page.component";

export const routes: Routes = [
  { path: 'signUp', component: SignUpComponent },
  { path: '', component: LandingComponent },
  {path:'logIn',component:LogInComponent},
  {path:'pipeline/:id',component:PipelineComponent},
  {path:'pipeline/:id/:filterId',component:FilterPageComponent},

  {
    path: 'pipelines',
    children: [
      {path:'dataSet',component:DataSetTableComponent}
    ],
    component: PageComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
