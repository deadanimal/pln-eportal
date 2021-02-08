import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AccordionModule,
  BsDropdownModule,
  ModalModule,
  ProgressbarModule,
  RatingModule,
  TabsModule,
  TooltipModule,
} from "ngx-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { QuillModule } from "ngx-quill";

import { CheckboxCheckedPipe } from "src/app/shared/pipes/checkbox/checkbox-checked.pipe";
import { SafePipe } from "src/app/shared/pipes/safe/safe.pipe";

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
import { VirtualLibrariesListComponent } from "./virtual-libraries/virtual-libraries-list/virtual-libraries-list.component";
import { FeedbacksListComponent } from "./feedbacks/feedbacks-list/feedbacks-list.component";
import { SurveysListComponent } from "./surveys/surveys-list/surveys-list.component";
import { SurveysAnswerComponent } from "./surveys/surveys-answer/surveys-answer.component";
import { AssetsComponent } from "./assets/assets.component";
import { UsersComponent } from "./managements/users/users.component";
import { ExhibitsComponent } from "./exhibits/exhibits/exhibits.component";
import { ExhibitsDetailComponent } from "./exhibits/exhibits-detail/exhibits-detail.component";
import { VenuesComponent } from "./venues/venues.component";
import { PublicationsComponent } from "./publications/publications/publications.component";
import { VirtualLibraryCategoriesListComponent } from "./virtual-libraries/virtual-library-categories-list/virtual-library-categories-list.component";
import { VirtualLibraryArticlesListComponent } from "./virtual-libraries/virtual-library-articles-list/virtual-library-articles-list.component";
import { VirtualLibraryCollectionsListComponent } from "./virtual-libraries/virtual-library-collections-list/virtual-library-collections-list.component";
import { VirtualLibraryBooksListComponent } from "./virtual-libraries/virtual-library-books-list/virtual-library-books-list.component";
import { VirtualLibrarySerialpublicationsListComponent } from "./virtual-libraries/virtual-library-serialpublications-list/virtual-library-serialpublications-list.component";
import { VirtualLibraryEsourceCategoriesListComponent } from "./virtual-libraries/virtual-library-esource-categories-list/virtual-library-esource-categories-list.component";
import { VirtualLibraryEsourcesListComponent } from "./virtual-libraries/virtual-library-esources-list/virtual-library-esources-list.component";
import { VirtualLibraryArchivekutubkhanahCategoriesListComponent } from "./virtual-libraries/virtual-library-archivekutubkhanah-categories-list/virtual-library-archivekutubkhanah-categories-list.component";
import { VirtualLibraryArchivekutubkhanahsListComponent } from "./virtual-libraries/virtual-library-archivekutubkhanahs-list/virtual-library-archivekutubkhanahs-list.component";
import { PartnersComponent } from "./cms/partners/partners.component";
import { EmployeeDirectoriesComponent } from "./cms/employee-directories/employee-directories.component";
import { ShowsApplicationsComponent } from "./shows/shows-applications/shows-applications.component";
import { ShowsApplicationsDetailComponent } from "./shows/shows-applications-detail/shows-applications-detail.component";
import { QuickLinksComponent } from "./cms/quick-links/quick-links.component";
import { RatingsComponent } from "./cms/ratings/ratings.component";
import { VisitsListComponent } from "./visits/visits-list/visits-list.component";
import { BannersComponent } from "./cms/banners/banners.component";
import { AnnouncementsComponent } from "./cms/announcements/announcements.component";
import { FaqsComponent } from "./cms/faqs/faqs.component";
import { FacilitiesSubcategoryComponent } from "./facilities/facilities-subcategory/facilities-subcategory.component";
import { EmailTemplatesComponent } from "./managements/email-templates/email-templates.component";
import { TotalTicketSalesShowsComponent } from "./analytics/total-ticket-sales-shows/total-ticket-sales-shows.component";
import { TotalTicketSalesSimulatorRidesComponent } from "./analytics/total-ticket-sales-simulator-rides/total-ticket-sales-simulator-rides.component";
import { NumberOfVisitorsComponent } from "./analytics/number-of-visitors/number-of-visitors.component";
import { TotalDownloadsPdfPublicationComponent } from "./analytics/total-downloads-pdf-publication/total-downloads-pdf-publication.component";
import { TotalDownloadsPdfVirtualLibraryComponent } from "./analytics/total-downloads-pdf-virtual-library/total-downloads-pdf-virtual-library.component";
import { NumberOfFacilityBookingsComponent } from "./analytics/number-of-facility-bookings/number-of-facility-bookings.component";
import { NumberOfProgramParticipantsComponent } from "./analytics/number-of-program-participants/number-of-program-participants.component";
import { DailySalesQuotesComponent } from "./analytics/daily-sales-quotes/daily-sales-quotes.component";
import { ModulesComponent } from "./cms/modules/modules.component";
import { WhatIsInterestingsComponent } from "./cms/what-is-interestings/what-is-interestings.component";
import { DynamicContentsComponent } from "./cms/dynamic-contents/dynamic-contents.component";
import { CustomersComponent } from "./managements/customers/customers.component";
import { FpxsListComponent } from './fpxs/fpxs-list/fpxs-list.component';
import { FpxsBankListComponent } from './fpxs/fpxs-bank-list/fpxs-bank-list.component';
import { FpxsResponseCodeListComponent } from './fpxs/fpxs-response-code-list/fpxs-response-code-list.component';
import { InvoicesListComponent } from './invoice-receipts/invoices-list/invoices-list.component';
import { ReceiptsListComponent } from './invoice-receipts/receipts-list/receipts-list.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { RefundsComponent } from './refunds/refunds.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    CheckboxCheckedPipe,
    SafePipe,
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
    PublicationsComponent,
    VirtualLibraryCategoriesListComponent,
    VirtualLibraryArticlesListComponent,
    VirtualLibraryCollectionsListComponent,
    VirtualLibraryBooksListComponent,
    VirtualLibrarySerialpublicationsListComponent,
    VirtualLibraryEsourceCategoriesListComponent,
    VirtualLibraryEsourcesListComponent,
    VirtualLibraryArchivekutubkhanahCategoriesListComponent,
    VirtualLibraryArchivekutubkhanahsListComponent,
    PartnersComponent,
    EmployeeDirectoriesComponent,
    ShowsApplicationsComponent,
    ShowsApplicationsDetailComponent,
    QuickLinksComponent,
    RatingsComponent,
    VisitsListComponent,
    BannersComponent,
    AnnouncementsComponent,
    FaqsComponent,
    FacilitiesSubcategoryComponent,
    EmailTemplatesComponent,
    TotalTicketSalesShowsComponent,
    TotalTicketSalesSimulatorRidesComponent,
    NumberOfVisitorsComponent,
    TotalDownloadsPdfPublicationComponent,
    TotalDownloadsPdfVirtualLibraryComponent,
    NumberOfFacilityBookingsComponent,
    NumberOfProgramParticipantsComponent,
    DailySalesQuotesComponent,
    ModulesComponent,
    WhatIsInterestingsComponent,
    DynamicContentsComponent,
    CustomersComponent,
    FpxsListComponent,
    FpxsBankListComponent,
    FpxsResponseCodeListComponent,
    InvoicesListComponent,
    ReceiptsListComponent,
    VouchersComponent,
    RefundsComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    RatingModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    QuillModule.forRoot(),
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgxDatatableModule,
    RouterModule.forChild(UserRoutes),
  ],
})
export class UserModule {}
