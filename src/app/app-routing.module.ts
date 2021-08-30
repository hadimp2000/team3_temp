import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageComponent} from "./layouts/page/page.component";
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './layouts/header/header.component';
import {SignUpComponent} from "./identify/sign-up/sign-up.component";
import {LogInComponent} from "./identify/log-in/log-in.component";

export const routes: Routes = [
  { path: 'signUp', component: SignUpComponent },
  { path: '', component: LandingComponent },
  {path:'logIn',component:LogInComponent},
  {
    path: 'pipeline',
    children: [
    ],
    component: PageComponent,
  },
  { path: '**', redirectTo: '' },

  {path:'logIn',component:LogInComponent},
  {path:'',redirectTo:'/signUp', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
