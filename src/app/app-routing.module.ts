import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './layouts/page/page.component';
import { LandingComponent } from './landing/landing.component';
import { SignUpComponent } from './identify/sign-up/sign-up.component';
import { LogInComponent } from './identify/log-in/log-in.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { DatasetComponent } from './dataset/dataset.component';
import { DataSetSampleTableComponent } from './dataset/data-set-sample-table/data-set-sample-table.component';
import { PipelinesListComponent } from './pipelines-list/pipelines-list.component';
import { AuthService } from './identify/gaurd/auth.service';
import {SqlFormComponentComponent} from "./dataset/banner/sql-form-component/sql-form-component.component";

export const routes: Routes = [
  { path: 'signUp', component: SignUpComponent },
  { path: 'logIn', component: LogInComponent },
  {
    path: 'pipeline/:id',
    component: PipelineComponent,
    canActivate: [AuthService],
  },
  {
    path: 'pipelines',
    canActivate: [AuthService],
    children: [
      {path:'pipelinesList',component:PipelinesListComponent},
      {path:'dataSet',component:DatasetComponent},
      {path:'dataSet/:name',component:DataSetSampleTableComponent},
      {path:'sqlForm',component:SqlFormComponentComponent}

    ],
    component: PageComponent,
  },
  { path: '', component: LandingComponent },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService],
})
export class AppRoutingModule {}
