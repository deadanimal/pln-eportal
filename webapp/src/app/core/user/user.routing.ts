import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/guard/auth.guard";
import { DailySalesQuotesComponent } from "./analytics/daily-sales-quotes/daily-sales-quotes.component";
import { NumberOfFacilityBookingsComponent } from "./analytics/number-of-facility-bookings/number-of-facility-bookings.component";
import { NumberOfProgramParticipantsComponent } from "./analytics/number-of-program-participants/number-of-program-participants.component";
import { NumberOfVisitorsComponent } from "./analytics/number-of-visitors/number-of-visitors.component";
import { TotalDownloadsPdfPublicationComponent } from "./analytics/total-downloads-pdf-publication/total-downloads-pdf-publication.component";
import { TotalDownloadsPdfVirtualLibraryComponent } from "./analytics/total-downloads-pdf-virtual-library/total-downloads-pdf-virtual-library.component";
import { TotalTicketSalesShowsComponent } from "./analytics/total-ticket-sales-shows/total-ticket-sales-shows.component";
import { RegistrationComponent } from "./analytics/registration/registration.component";
import { TotalTicketSalesSimulatorRidesComponent } from "./analytics/total-ticket-sales-simulator-rides/total-ticket-sales-simulator-rides.component";
import { AssetsComponent } from "./assets/assets.component";
import { AuditLogsComponent } from "./audit-logs/audit-logs.component";

import { CalendarComponent } from "./calendar/calendar.component";
import { CartsComponent } from "./carts/carts.component";
import { CloseBookingComponent } from "./close-booking/close-booking.component";
import { AnnouncementsComponent } from "./cms/announcements/announcements.component";
import { BannersComponent } from "./cms/banners/banners.component";
import { DynamicContentsComponent } from "./cms/dynamic-contents/dynamic-contents.component";
import { EmployeeDirectoriesComponent } from "./cms/employee-directories/employee-directories.component";
import { FaqsComponent } from "./cms/faqs/faqs.component";
import { ModulesComponent } from "./cms/modules/modules.component";
import { PartnersComponent } from "./cms/partners/partners.component";
import { QuickLinksComponent } from "./cms/quick-links/quick-links.component";
import { RatingsComponent } from "./cms/ratings/ratings.component";
import { SubModulesComponent } from "./cms/sub-modules/sub-modules.component";
import { WhatIsInterestingsComponent } from "./cms/what-is-interestings/what-is-interestings.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ExhibitsDetailComponent } from "./exhibits/exhibits-detail/exhibits-detail.component";
import { ExhibitsListComponent } from "./exhibits/exhibits-list/exhibits-list.component";
import { ExhibitsComponent } from "./exhibits/exhibits/exhibits.component";
import { FacilitiesApplicationComponent } from "./facilities/facilities-application/facilities-application.component";
import { FacilitiesListComponent } from "./facilities/facilities-list/facilities-list.component";
import { FacilitiesSubcategoryComponent } from "./facilities/facilities-subcategory/facilities-subcategory.component";
import { FeedbacksListComponent } from "./feedbacks/feedbacks-list/feedbacks-list.component";
import { FpxsBankListComponent } from "./fpxs/fpxs-bank-list/fpxs-bank-list.component";
import { FpxsListComponent } from "./fpxs/fpxs-list/fpxs-list.component";
import { FpxsResponseCodeListComponent } from "./fpxs/fpxs-response-code-list/fpxs-response-code-list.component";
import { InvoicesListComponent } from "./invoice-receipts/invoices-list/invoices-list.component";
import { ReceiptsListComponent } from "./invoice-receipts/receipts-list/receipts-list.component";
import { CustomersComponent } from "./managements/customers/customers.component";
import { NotifikasiComponent } from "./managements/notifikasi/notifikasi.component";
import { ProfileComponent } from "./managements/profile/profile.component";
import { EmailTemplatesComponent } from "./managements/email-templates/email-templates.component";
import { MenusComponent } from "./managements/menus/menus.component";
import { RolesComponent } from "./managements/roles/roles.component";
import { SupervisorsComponent } from "./managements/supervisors/supervisors.component";
import { UserAccessesComponent } from "./managements/user-accesses/user-accesses.component";
import { UsersComponent } from "./managements/users/users.component";
import { ProgramsApplicationComponent } from "./programs/programs-application/programs-application.component";
import { ProgramsListComponent } from "./programs/programs-list/programs-list.component";
import { PublicationsListComponent } from "./publications/publications-list/publications-list.component";
import { PublicationsComponent } from "./publications/publications/publications.component";
import { RefundsComponent } from "./refunds/refunds.component";
import { ContractorsComponent } from "./reports/daily-operating-report/contractors/contractors.component";
import { DailyOperatingsComponent } from "./reports/daily-operating-report/daily-operatings/daily-operatings.component";
import { DetailsComponent } from "./reports/daily-operating-report/details/details.component";
import { OperatingSchedulesComponent } from "./reports/daily-operating-report/operating-schedules/operating-schedules.component";
import { VisitorSummariesComponent } from "./reports/daily-operating-report/visitor-summaries/visitor-summaries.component";
import { ShowsApplicationsDetailComponent } from "./shows/shows-applications-detail/shows-applications-detail.component";
import { ShowsApplicationsComponent } from "./shows/shows-applications/shows-applications.component";
import { ShowsBookingsComponent } from "./shows/shows-bookings/shows-bookings.component";
import { ShowsListComponent } from "./shows/shows-list/shows-list.component";
import { ShowsScheduleComponent } from "./shows/shows-schedule/shows-schedule.component";
import { SimulatorRideApplicationsComponent } from "./simulator-ride/simulator-ride-applications/simulator-ride-applications.component";
import { SimulatorRideBookingsComponent } from "./simulator-ride/simulator-ride-bookings/simulator-ride-bookings.component";
import { SimulatorRideScheduleComponent } from "./simulator-ride/simulator-ride-schedule/simulator-ride-schedule.component";
import { SurveysAnswerComponent } from "./surveys/surveys-answer/surveys-answer.component";
import { SurveysListComponent } from "./surveys/surveys-list/surveys-list.component";
import { TicketPricesComponent } from "./ticket-prices/ticket-prices.component";
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
import { VirtualLibrariesPanduanPenggunaComponent } from "./virtual-libraries/virtual-libraries-panduan-pengguna/virtual-libraries-panduan-pengguna.component";
import { VisitsApplicationsComponent } from "./visits/visits-applications/visits-applications.component";
import { VisitsListComponent } from "./visits/visits-list/visits-list.component";
import { VouchersComponent } from "./vouchers/vouchers.component";
import { ChangePasswordComponent } from './managements/change-password/change-password.component';

export const UserRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        canActivate: [AuthGuard],
        component: DashboardComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "change-password",
        component: ChangePasswordComponent,
      },
      {
        path: "exhibits",
        canActivate: [AuthGuard],
        children: [
          {
            path: "",
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
        canActivate: [AuthGuard],
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
        canActivate: [AuthGuard],
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
        canActivate: [AuthGuard],
        children: [
          {
            path: "",
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
        canActivate: [AuthGuard],
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
          {
            path: "panduan_pengguna",
            component: VirtualLibrariesPanduanPenggunaComponent
            ,
          },
        ],
      },
      {
        path: "analytics",
        canActivate: [AuthGuard],
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
          {
            path: "registration",
            component: RegistrationComponent,
          },
        ],
      },
      {
        path: "reports",
        canActivate: [AuthGuard],
        children: [
          {
            path: "daily-operatings",
            component: DailyOperatingsComponent,
          },
          {
            path: "daily-operatings/contractors/:id",
            component: ContractorsComponent,
          },
          {
            path: "daily-operatings/operating-schedules/:id",
            component: OperatingSchedulesComponent,
          },
          {
            path: "daily-operatings/visitor-summaries/:id",
            component: VisitorSummariesComponent,
          },
          {
            path: "daily-operatings/details/:id",
            component: DetailsComponent,
          },
        ],
      },
      {
        path: "shows",
        canActivate: [AuthGuard],
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
            path: "applications/:showtime_id/bookings",
            component: ShowsBookingsComponent,
          },
          {
            path: "schedule",
            component: ShowsScheduleComponent,
          },
        ],
      },
      {
        path: "simulator-ride",
        canActivate: [AuthGuard],
        children: [
          {
            path: "applications",
            component: SimulatorRideApplicationsComponent,
          },
          {
            path: "bookings",
            component: SimulatorRideBookingsComponent,
          },
          {
            path: "schedule",
            component: SimulatorRideScheduleComponent,
          },
        ],
      },
      {
        path: "surveys",
        canActivate: [AuthGuard],
        children: [
          {
            path: "",
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
        canActivate: [AuthGuard],
        component: FeedbacksListComponent,
      },
      {
        path: "assets",
        canActivate: [AuthGuard],
        children: [
          {
            path: "list",
            component: AssetsComponent,
          },
        ],
      },
      {
        path: "visits",
        canActivate: [AuthGuard],
        children: [
          {
            path: "list",
            component: VisitsListComponent,
          },
          {
            path: "applications",
            component: VisitsApplicationsComponent,
          },
        ],
      },
      {
        path: "cms",
        canActivate: [AuthGuard],
        children: [
          {
            path: "modules",
            component: ModulesComponent,
          },
          {
            path: "sub-modules",
            component: SubModulesComponent,
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
          {
            path: "close-booking",
            component: CloseBookingComponent,
          },
          {
            path: "venues",
            component: VenuesComponent,
          },
          {
            path: "calendar",
            component: CalendarComponent,
          },
        ],
      },
      {
        path: "transactions",
        canActivate: [AuthGuard],
        children: [
          {
            path: "ticket-prices",
            component: TicketPricesComponent,
          },
          {
            path: "refunds",
            component: RefundsComponent,
          },
          {
            path: "vouchers",
            component: VouchersComponent,
          },
          {
            path: "carts",
            component: CartsComponent,
          },
          {
            path: "invoices",
            component: InvoicesListComponent,
          },
          {
            path: "receipts",
            component: ReceiptsListComponent,
          },
        ],
      },
      {
        path: "fpxs",
        canActivate: [AuthGuard],
        children: [
          {
            path: "list",
            component: FpxsListComponent,
          },
          {
            path: "bank-list",
            component: FpxsBankListComponent,
          },
          {
            path: "response-code-list",
            component: FpxsResponseCodeListComponent,
          },
        ],
      },
      {
        path: "managements",
        canActivate: [AuthGuard],
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
            path: "supervisors",
            component: SupervisorsComponent,
          },
          {
            path: "user-accesses",
            component: UserAccessesComponent,
          },
          {
            path: "roles",
            component: RolesComponent,
          },
          {
            path: "menus",
            component: MenusComponent,
          },
          {
            path: "email-templates",
            component: EmailTemplatesComponent,
          },
          {
            path: "audit-logs",
            component: AuditLogsComponent,
          },
          {
            path: "notifikasi",
            component: NotifikasiComponent,
          },

        ],
      },
    ],
  },
];
