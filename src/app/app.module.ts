import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { AsideComponent } from './layouts/aside/aside.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { LandingHeaderComponent } from './landing/landing-header/landing-header.component';
import { LandingFooterComponent } from './landing/landing-footer/landing-footer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PageComponent } from './layouts/page/page.component';
import { SignUpComponent } from './identify/sign-up/sign-up.component';
import { LogInComponent } from './identify/log-in/log-in.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { PipelineHeaderComponent } from './pipeline/pipeline-header/pipeline-header.component';
import { PipelineDetailsComponent } from './pipeline/pipeline-details/pipeline-details.component';
import { PipelineTableComponent } from './pipeline/pipeline-table/pipeline-table.component';
import { FilterDetailsComponent } from './pipeline/filter-page/filter-details/filter-details.component';
import { FilterPageComponent } from './pipeline/filter-page/filter-page.component';
import { PipelineBoardComponent } from './pipeline/pipeline-board/pipeline-board.component';
import { CommonModule } from '@angular/common';
import { AddDataModalComponent } from './pipeline/pipeline-board/modals/add-data-modal/add-data-modal.component';
import { AddProcessModalComponent } from './pipeline/pipeline-board/modals/add-process-modal/add-process-modal.component';
import { JoinDetailsComponent } from './pipeline/join-details/join-details.component';
import { AggregateDetailsComponent } from './pipeline/aggregate-details/aggregate-details.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSetTableComponent } from './dataset/data-set-table/data-set-table.component';
import { BannerComponent } from './dataset/banner/banner.component';
import { MaterialModule } from './material/material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatasetComponent } from './dataset/dataset.component';
import { DataSetSampleTableComponent } from './dataset/data-set-sample-table/data-set-sample-table.component';
import { PipelinesListComponent } from './pipelines-list/pipelines-list.component';
import { MatRadioModule } from '@angular/material/radio';
import { SendRequestService } from './services/send-request-service.service';
import { SqlFormModalComponent } from './dataset/banner/sql-form-modal/sql-form-modal.component';
import { SqlFormComponentComponent } from './dataset/banner/sql-form-component/sql-form-component.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';

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
    PipelineTableComponent,
    FilterDetailsComponent,
    FilterPageComponent,
    PipelineBoardComponent,
    DataSetTableComponent,
    BannerComponent,
    AddDataModalComponent,
    AddProcessModalComponent,
    BannerComponent,
    JoinDetailsComponent,
    AggregateDetailsComponent,
    BannerComponent,
    DatasetComponent,
    DataSetSampleTableComponent,
    PipelinesListComponent,
    SqlFormModalComponent,
    SqlFormComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    CommonModule,
    MatDialogModule,
    MaterialModule,
    HttpClientModule,
    MatRadioModule,
    MatGridListModule,
    MatSnackBarModule,
  ],

  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    HttpClient,
    AddDataModalComponent,
    AddProcessModalComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
