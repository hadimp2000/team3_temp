import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageComponent} from "./layouts/page/page.component";
import { LandingComponent } from './landing/landing.component';
import {SignUpComponent} from "./identify/sign-up/sign-up.component";
import {LogInComponent} from "./identify/log-in/log-in.component";
import {PipelineComponent} from "./pipeline/pipeline.component";

export const routes: Routes = [
  { path: 'signUp', component: SignUpComponent },
  { path: '', component: LandingComponent },
  {path:'logIn',component:LogInComponent},
  {path:'pipeline/:id',component:PipelineComponent},
  {
    path: 'pipelines',
    children: [
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
