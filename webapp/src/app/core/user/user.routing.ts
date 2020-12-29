import { Routes } from "@angular/router";
import { DailySalesQuotesComponent } from "./analytics/daily-sales-quotes/daily-sales-quotes.component";
import { NumberOfFacilityBookingsComponent } from "./analytics/number-of-facility-bookings/number-of-facility-bookings.component";
import { NumberOfProgramParticipantsComponent } from "./analytics/number-of-program-participants/number-of-program-participants.component";
import { NumberOfVisitorsComponent } from "./analytics/number-of-visitors/number-of-visitors.component";
import { TotalDownloadsPdfPublicationComponent } from "./analytics/total-downloads-pdf-publication/total-downloads-pdf-publication.component";
import { TotalDownloadsPdfVirtualLibraryComponent } from "./analytics/total-downloads-pdf-virtual-library/total-downloads-pdf-virtual-library.component";
import { TotalTicketSalesShowsComponent } from "./analytics/total-ticket-sales-shows/total-ticket-sales-shows.component";
import { TotalTicketSalesSimulatorRidesComponent } from "./analytics/total-ticket-sales-simulator-rides/total-ticket-sales-simulator-rides.component";
import { AssetsComponent } from "./assets/assets.component";

import { CalendarComponent } from "./calendar/calendar.component";
import { AnnouncementsComponent } from "./cms/announcements/announcements.component";
import { BannersComponent } from "./cms/banners/banners.component";
import { DynamicContentsComponent } from './cms/dynamic-contents/dynamic-contents.component';
import { EmployeeDirectoriesComponent } from "./cms/employee-directories/employee-directories.component";
import { FaqsComponent } from "./cms/faqs/faqs.component";
import { ModulesComponent } from "./cms/modules/modules.component";
import { PartnersComponent } from "./cms/partners/partners.component";
import { QuickLinksComponent } from "./cms/quick-links/quick-links.component";
import { RatingsComponent } from "./cms/ratings/ratings.component";
import { WhatIsInterestingsComponent } from './cms/what-is-interestings/what-is-interestings.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ExhibitsDetailComponent } from "./exhibits/exhibits-detail/exhibits-detail.component";
import { ExhibitsListComponent } from "./exhibits/exhibits-list/exhibits-list.component";
import { ExhibitsComponent } from "./exhibits/exhibits/exhibits.component";
import { FacilitiesApplicationComponent } from "./facilities/facilities-application/facilities-application.component";
import { FacilitiesListComponent } from "./facilities/facilities-list/facilities-list.component";
import { FacilitiesSubcategoryComponent } from "./facilities/facilities-subcategory/facilities-subcategory.component";
import { FeedbacksListComponent } from "./feedbacks/feedbacks-list/feedbacks-list.component";
import { CustomersComponent } from "./managements/customers/customers.component";
import { EmailTemplatesComponent } from "./managements/email-templates/email-templates.component";
import { UsersComponent } from "./managements/users/users.component";
import { ProgramsApplicationComponent } from "./programs/programs-application/programs-application.component";
import { ProgramsListComponent } from "./programs/programs-list/programs-list.component";
import { ProgramsWaitingListComponent } from "./programs/programs-waiting-list/programs-waiting-list.component";
import { PublicationsListComponent } from "./publications/publications-list/publications-list.component";
import { PublicationsComponent } from "./publications/publications/publications.component";
import { ReportsAnalysisComponent } from "./reports/reports-analysis/reports-analysis.component";
import { ReportsOperationComponent } from "./reports/reports-operation/reports-operation.component";
import { ReportsTicketSalesComponent } from "./reports/reports-ticket-sales/reports-ticket-sales.component";
import { ShowsApplicationsDetailComponent } from "./shows/shows-applications-detail/shows-applications-detail.component";
import { ShowsApplicationsComponent } from "./shows/shows-applications/shows-applications.component";
import { ShowsListComponent } from "./shows/shows-list/shows-list.component";
import { ShowsScheduleComponent } from "./shows/shows-schedule/shows-schedule.component";
import { SimulatorRideApplicationsComponent } from "./simulator-ride/simulator-ride-applications/simulator-ride-applications.component";
import { SimulatorRideScheduleComponent } from "./simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component";
import { SurveysAnswerComponent } from "./surveys/surveys-answer/surveys-answer.component";
import { SurveysListComponent } from "./surveys/surveys-list/surveys-list.component";
import { TicketsPriceComponent } from "./tickets/tickets-price/tickets-price.component";
import { VenuesComponent } from "./venues/venues.component";
import { VirtualLibrariesListComponent } from "./virtual-libraries/virtual-libraries-list/virtual-libraries-list.component";
import { VirtualLibraryArchivekutubkhanahCategoriesListComponent } from "./virtual-libraries/virtual-library-archivekutubkhanah-categories-list/virtual-library-archivekutubkhanah-categories-list.component";
import { VirtualLibraryArchivekutubkhanahsListComponent } from "./virtual-libraries/virtual-library-archivekutubkhanahs-list/virtual-library-archivekutubkhanahs-list.component";
import { VirtualLibraryArticlesListComponent } from "./virtual-libraries/virtual-library-articles-list/virtual-library-articles-list.component";
import { VirtualLibraryBooksListComponent } from "./virtual-libraries/virtual-library-books-list/virtual-library-books-list.component";
import { VirtualLibraryCategoriesListComponent } from "./virtual-libraries/virtual-library-categories-list/virtual-library-categories-list.component";
import { VirtualLibraryCollectionsListComponent } from "./virtual-libraries/virtual-library-collections-list/virtual-library-collections-list.component";
import { VirtualLibraryEsourceCategoriesListComponent } from "./virtual-libraries/virtual-library-esource-categories-list/virtual-library-esource-categories-list.component";
import { VirtualLibraryEsourcesListComponent } from "./virtual-libraries/virtual-library-esources-list/virtual-library-esources-list.component";
import { VirtualLibrarySerialpublicationsListComponent } from "./virtual-libraries/virtual-library-serialpublications-list/virtual-library-serialpublications-list.component";
import { VisitsApplicationsComponent } from "./visits/visits-applications/visits-applications.component";
import { VisitsListComponent } from "./visits/visits-list/visits-list.component";
import { VisitsScheduleComponent } from "./visits/visits-schedule/visits-schedule.component";

export const UserRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "calendar",
        component: CalendarComponent,
      },
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "exhibits",
        children: [
          {
            path: "list",
            component: ExhibitsComponent,
          },
          {
            path: "list/:id",
            component: ExhibitsListComponent,
          },
          {
            path: "detail/:id",
            component: ExhibitsDetailComponent,
          },
        ],
      },
      {
        path: "facilities",
        children: [
          {
            path: "subcategory",
            component: FacilitiesSubcategoryComponent,
          },
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
            component: PublicationsComponent,
          },
          {
            path: "list/:publication_category_id",
            component: PublicationsListComponent,
          },
        ],
      },
      {
        path: "virtual-libraries",
        children: [
          {
            path: "list",
            component: VirtualLibraryCategoriesListComponent,
          },
          {
            path: "articles",
            component: VirtualLibraryArticlesListComponent,
          },
          {
            path: "collections",
            component: VirtualLibraryCollectionsListComponent,
          },
          {
            path: "collections/book/:book",
            component: VirtualLibraryBooksListComponent,
          },
          {
            path: "collections/serialpublication/:serialpublication",
            component: VirtualLibrarySerialpublicationsListComponent,
          },
          {
            path: "collections/esource/:esource",
            component: VirtualLibraryEsourceCategoriesListComponent,
          },
          {
            path: "collections/esource/:esource/:id",
            component: VirtualLibraryEsourcesListComponent,
          },
          {
            path: "collections/archivekutubkhanah/:archivekutubkhanah",
            component: VirtualLibraryArchivekutubkhanahCategoriesListComponent,
          },
          {
            path: "collections/archivekutubkhanah/:archivekutubkhanah/:id",
            component: VirtualLibraryArchivekutubkhanahsListComponent,
          },
        ],
      },
      {
        path: "analytics",
        children: [
          {
            path: "total-ticket-sales-shows",
            component: TotalTicketSalesShowsComponent,
          },
          {
            path: "total-ticket-sales-simulator-rides",
            component: TotalTicketSalesSimulatorRidesComponent,
          },
          {
            path: "total-downloads-pdf-publication",
            component: TotalDownloadsPdfPublicationComponent,
          },
          {
            path: "total-downloads-pdf-virtual-library",
            component: TotalDownloadsPdfVirtualLibraryComponent,
          },
          {
            path: "number-of-visitors",
            component: NumberOfVisitorsComponent,
          },
          {
            path: "number-of-facility-bookings",
            component: NumberOfFacilityBookingsComponent,
          },
          {
            path: "number-of-program-participants",
            component: NumberOfProgramParticipantsComponent,
          },
          {
            path: "daily-sales-quotes",
            component: DailySalesQuotesComponent,
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
            path: "applications",
            component: ShowsApplicationsComponent,
          },
          {
            path: "applications/:showtime_id",
            component: ShowsApplicationsDetailComponent,
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
            path: "applications",
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
            component: SurveysAnswerComponent,
          },
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
        path: "venues",
        children: [
          {
            path: "list",
            component: VenuesComponent,
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
            path: "list",
            component: VisitsListComponent,
          },
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
        path: "cms",
        children: [
          {
            path: "modules",
            component: ModulesComponent,
          },
          {
            path: "whatisinterestings",
            component: WhatIsInterestingsComponent,
          },
          {
            path: "dynamic-contents",
            component: DynamicContentsComponent,
          },
          {
            path: "partners",
            component: PartnersComponent,
          },
          {
            path: "employee-directories",
            component: EmployeeDirectoriesComponent,
          },
          {
            path: "quick-links",
            component: QuickLinksComponent,
          },
          {
            path: "ratings",
            component: RatingsComponent,
          },
          {
            path: "announcements",
            component: AnnouncementsComponent,
          },
          {
            path: "banners",
            component: BannersComponent,
          },
          {
            path: "faqs",
            component: FaqsComponent,
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
          {
            path: "customers",
            component: CustomersComponent,
          },
          {
            path: "email-templates",
            component: EmailTemplatesComponent,
          },
        ],
      },
    ],
  },
];
