import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  BsDropdownModule, 
  ProgressbarModule, 
  TooltipModule, 
  BsDatepickerModule,
  ModalModule
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';
import * as PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
FusionChartsModule.fcRoot(
  FusionCharts, 
  Charts,
  Widgets,
  FusionTheme,
  PowerCharts
);
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ManagementComponent } from './management/management.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ReportComponent } from './report/report.component';
import { TicketingComponent } from './ticketing/ticketing.component';
import { ShowComponent } from './show/show.component';
import { ExhibitComponent } from './exhibit/exhibit.component';
import { VisitComponent } from './visit/visit.component';
import { ProgramComponent } from './program/program.component';
import { SurveyComponent } from './survey/survey.component';
import { FacilityComponent } from './facility/facility.component';
import { PublicationComponent } from './publication/publication.component';
import { AssetComponent } from './asset/asset.component';
import { VenueComponent } from './venue/venue.component';
import { ShowingDatabaseComponent } from './showing-database/showing-database.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    ManagementComponent,
    AnalyticsComponent,
    ReportComponent,
    TicketingComponent,
    ShowComponent,
    ExhibitComponent,
    VisitComponent,
    ProgramComponent,
    SurveyComponent,
    FacilityComponent,
    PublicationComponent,
    AssetComponent,
    VenueComponent,
    ShowingDatabaseComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(AdminRoutes),
    FusionChartsModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    NgxDatatableModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class AdminModule { }
