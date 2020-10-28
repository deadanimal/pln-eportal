import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AccordionModule,
  BsDropdownModule,
  ModalModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule,
} from "ngx-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LoadingBarModule } from "@ngx-loading-bar/core";

import { RouterModule } from "@angular/router";
import { UserRoutes } from "./user.routing";
import { CalendarComponent } from "./calendar/calendar.component";
import { ExhibitsListComponent } from "./exhibits/exhibits-list/exhibits-list.component";
import { FacilitiesApplicationComponent } from "./facilities/facilities-application/facilities-application.component";
import { FacilitiesListComponent } from "./facilities/facilities-list/facilities-list.component";
import { ProgramsApplicationComponent } from "./programs/programs-application/programs-application.component";
import { ProgramsListComponent } from "./programs/programs-list/programs-list.component";
import { ProgramsWaitingListComponent } from "./programs/programs-waiting-list/programs-waiting-list.component";
import { PublicationsListComponent } from "./publications/publications-list/publications-list.component";
import { ReportsOperationComponent } from "./reports/reports-operation/reports-operation.component";
import { ReportsAnalysisComponent } from "./reports/reports-analysis/reports-analysis.component";
import { ReportsTicketSalesComponent } from "./reports/reports-ticket-sales/reports-ticket-sales.component";
import { ShowsScheduleComponent } from "./shows/shows-schedule/shows-schedule.component";
import { ShowsListComponent } from "./shows/shows-list/shows-list.component";
import { SimulatorRideScheduleComponent } from "./simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component";
import { SimulatorRideApplicationsComponent } from "./simulator-ride/simulator-ride-applications/simulator-ride-applications.component";
import { TicketsPriceComponent } from "./tickets/tickets-price/tickets-price.component";
import { VisitsApplicationsComponent } from "./visits/visits-applications/visits-applications.component";
import { VisitsScheduleComponent } from "./visits/visits-schedule/visits-schedule.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { VirtualLibrariesListComponent } from './virtual-libraries/virtual-libraries-list/virtual-libraries-list.component';
import { FeedbacksListComponent } from './feedbacks/feedbacks-list/feedbacks-list.component';
import { SurveysListComponent } from './surveys/surveys-list/surveys-list.component';
import { SurveysAnswerComponent } from './surveys/surveys-answer/surveys-answer.component';
import { AssetsComponent } from './assets/assets.component';
import { UsersComponent } from './managements/users/users.component';
import { ExhibitsComponent } from './exhibits/exhibits/exhibits.component';
import { ExhibitsDetailComponent } from './exhibits/exhibits-detail/exhibits-detail.component';
import { VenuesComponent } from './venues/venues.component';

@NgModule({
  declarations: [
    CalendarComponent,
    ExhibitsListComponent,
    FacilitiesListComponent,
    FacilitiesApplicationComponent,
    PublicationsListComponent,
    ProgramsApplicationComponent,
    ProgramsListComponent,
    ProgramsWaitingListComponent,
    ReportsOperationComponent,
    ReportsAnalysisComponent,
    ReportsTicketSalesComponent,
    ShowsScheduleComponent,
    ShowsListComponent,
    SimulatorRideScheduleComponent,
    SimulatorRideApplicationsComponent,
    TicketsPriceComponent,
    VisitsApplicationsComponent,
    VisitsScheduleComponent,
    DashboardComponent,
    VirtualLibrariesListComponent,
    FeedbacksListComponent,
    SurveysListComponent,
    SurveysAnswerComponent,
    AssetsComponent,
    UsersComponent,
    ExhibitsComponent,
    ExhibitsDetailComponent,
    VenuesComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgxDatatableModule,
    RouterModule.forChild(UserRoutes),
  ],
})
export class UserModule {}
