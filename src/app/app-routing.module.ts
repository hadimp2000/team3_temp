import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {PageComponent} from "./layouts/page/page.component";
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: '', component: LandingComponent },

  {path:'signUp',component:SignUpComponent},
  {
    path: '',
    children: [

    ],
    component: PageComponent,
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
