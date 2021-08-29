import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderComponent} from "./layouts/header/header.component";
import {SignUpComponent} from "./identify/sign-up/sign-up.component";
import {LogInComponent} from "./identify/log-in/log-in.component";

export const routes: Routes = [
  {path:'header',component:HeaderComponent},
  {path:'signUp',component:SignUpComponent},
  {path:'logIn',component:LogInComponent},
  {path:'',redirectTo:'/signUp', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
