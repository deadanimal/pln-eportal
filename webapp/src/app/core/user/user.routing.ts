import { Routes } from "@angular/router";
import { AssetsComponent } from './assets/assets.component';

import { CalendarComponent } from "./calendar/calendar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ExhibitsListComponent } from "./exhibits/exhibits-list/exhibits-list.component";
import { FacilitiesApplicationComponent } from "./facilities/facilities-application/facilities-application.component";
import { FacilitiesListComponent } from "./facilities/facilities-list/facilities-list.component";
import { FeedbacksListComponent } from "./feedbacks/feedbacks-list/feedbacks-list.component";
import { UsersComponent } from './managements/users/users.component';
import { ProgramsApplicationComponent } from "./programs/programs-application/programs-application.component";
import { ProgramsListComponent } from "./programs/programs-list/programs-list.component";
import { ProgramsWaitingListComponent } from "./programs/programs-waiting-list/programs-waiting-list.component";
import { PublicationsListComponent } from "./publications/publications-list/publications-list.component";
import { ReportsAnalysisComponent } from "./reports/reports-analysis/reports-analysis.component";
import { ReportsOperationComponent } from "./reports/reports-operation/reports-operation.component";
import { ReportsTicketSalesComponent } from "./reports/reports-ticket-sales/reports-ticket-sales.component";
import { ShowsListComponent } from "./shows/shows-list/shows-list.component";
import { ShowsScheduleComponent } from "./shows/shows-schedule/shows-schedule.component";
import { SimulatorRideApplicationsComponent } from "./simulator-ride/simulator-ride-applications/simulator-ride-applications.component";
import { SimulatorRideScheduleComponent } from "./simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component";
import { SurveysAnswerComponent } from './surveys/surveys-answer/surveys-answer.component';
import { SurveysListComponent } from "./surveys/surveys-list/surveys-list.component";
import { TicketsPriceComponent } from "./tickets/tickets-price/tickets-price.component";
import { VirtualLibrariesListComponent } from "./virtual-libraries/virtual-libraries-list/virtual-libraries-list.component";
import { VisitsApplicationsComponent } from "./visits/visits-applications/visits-applications.component";
import { VisitsScheduleComponent } from "./visits/visits-schedule/visits-schedule.component";

export const UserRoutes: Routes = [
  {
    path: "",
    children: [
      // {
      //   path: "calendar",
      //   component: CalendarComponent,
      // },
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "exhibits",
        children: [
          {
            path: "list",
            component: ExhibitsListComponent,
          },
        ],
      },
      {
        path: "facilities",
        children: [
          {
            path: "applications",
            component: FacilitiesApplicationComponent,
          },
          {
            path: "list",
            component: FacilitiesListComponent,
          },
        ],
      },
      {
        path: "programs",
        children: [
          {
            path: "applications",
            component: ProgramsApplicationComponent,
          },
          {
            path: "list",
            component: ProgramsListComponent,
          },
          // {
          //   path: "waiting-list",
          //   component: ProgramsWaitingListComponent,
          // },
        ],
      },
      {
        path: "publications",
        children: [
          {
            path: "list",
            component: PublicationsListComponent,
          },
        ],
      },
      {
        path: "virtual-libraries",
        children: [
          {
            path: "list",
            component: VirtualLibrariesListComponent,
          },
        ],
      },
      {
        path: "reports",
        children: [
          {
            path: "analysis",
            component: ReportsAnalysisComponent,
          },
          {
            path: "operation",
            component: ReportsOperationComponent,
          },
          {
            path: "ticket-sales",
            component: ReportsTicketSalesComponent,
          },
        ],
      },
      {
        path: "shows",
        children: [
          {
            path: "list",
            component: ShowsListComponent,
          },
          {
            path: "schedule",
            component: ShowsScheduleComponent,
          },
        ],
      },
      {
        path: "simulator-ride",
        children: [
          {
            path: "schedule/:id",
            component: SimulatorRideApplicationsComponent,
          },
          {
            path: "schedule",
            component: SimulatorRideScheduleComponent,
          },
        ],
      },
      {
        path: "surveys",
        children: [
          {
            path: "list",
            component: SurveysListComponent,
          },
          {
            path: "list/:id",
            component: SurveysAnswerComponent
          }
        ],
      },
      {
        path: "feedbacks",
        children: [
          {
            path: "list",
            component: FeedbacksListComponent,
          },
        ],
      },
      {
        path: "assets",
        children: [
          {
            path: "list",
            component: AssetsComponent,
          },
        ],
      },
      {
        path: "tickets",
        children: [
          {
            path: "prices",
            component: TicketsPriceComponent,
          },
        ],
      },
      {
        path: "visits",
        children: [
          {
            path: "applications",
            component: VisitsApplicationsComponent,
          },
          {
            path: "schedule",
            component: VisitsScheduleComponent,
          },
        ],
      },
      {
        path: "managements",
        children: [
          {
            path: "users",
            component: UsersComponent,
          },
        ],
      },
    ],
  },
];
