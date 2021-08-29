import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {PageComponent} from "./layouts/page/page.component";

export const routes: Routes = [

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
