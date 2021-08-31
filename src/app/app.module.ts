import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule, routes} from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { AsideComponent } from './layouts/aside/aside.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { LandingHeaderComponent } from './landing/landing-header/landing-header.component';
import { LandingFooterComponent } from './landing/landing-footer/landing-footer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PageComponent } from './layouts/page/page.component';
import {SignUpComponent} from "./identify/sign-up/sign-up.component";
import {LogInComponent} from "./identify/log-in/log-in.component";
import { PipelineComponent } from './pipeline/pipeline.component';
import { PipelineHeaderComponent } from './pipeline/pipeline-header/pipeline-header.component';
import { PipelineDetailsComponent } from './pipeline/pipeline-details/pipeline-details.component';
import { PipelineTableComponent } from './pipeline/pipeline-table/pipeline-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    FooterComponent,
    LandingComponent,
    LandingHeaderComponent,
    LandingFooterComponent,
    SignUpComponent,
    LogInComponent,
    PageComponent,
    PipelineComponent,
    PipelineHeaderComponent,
    PipelineDetailsComponent,
    PipelineTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule.forRoot(routes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
