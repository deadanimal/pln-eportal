import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { ExhibitComponent } from "./exhibit/exhibit.component";
import { ExhibitDetailsComponent } from "./exhibit-details/exhibit-details.component";
import { FacilityComponent } from "./facility/facility.component";
import { FacilityDetailsComponent } from "./facility-details/facility-details.component";
import { PaymentComponent } from "./payment/payment.component";
import { PaymentFacilityComponent } from "./payment-facility/payment-facility.component";
import { ProgramComponent } from "./program/program.component";
import { PublicationComponent } from "./publication/publication.component";
import { ShowsComponent } from "./shows/shows.component";
import { ShowDetailsComponent } from "./show-details/show-details.component";
import { SurveyComponent } from "./survey/survey.component";
import { TicketingComponent } from "./ticketing/ticketing.component";
import { VisitComponent } from "./visit/visit.component";
import { SimulatorRideComponent } from "./simulator-ride/simulator-ride.component";
import { VirtualLibraryComponent } from "./virtual-library/virtual-library.component";
import { LandingComponent } from "./landing/landing.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { OrganizationChartComponent } from "./organization-chart/organization-chart.component";
import { MissionVisionComponent } from "./mission-vision/mission-vision.component";
import { PdpaComponent } from "./pdpa/pdpa.component";
import { FaqComponent } from "./faq/faq.component";
import { SimulatorRideBookComponent } from "./simulator-ride-book/simulator-ride-book.component";
import { ShowsBookComponent } from "./shows-book/shows-book.component";
import { ExhibitListsComponent } from "./exhibit-lists/exhibit-lists.component";
import { OperatingHourComponent } from "./operating-hour/operating-hour.component";
import { DirectoryComponent } from "./directory/directory.component";
import { ProgramFormsComponent } from "./program-forms/program-forms.component";
import { FacilityDetailZonesComponent } from "./facility-detail-zones/facility-detail-zones.component";
import { NocComponent } from "./noc/noc.component";
import { CharterComponent } from "./charter/charter.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { CopyrightNoticeComponent } from "./copyright-notice/copyright-notice.component";
import { DisclaimerComponent } from "./disclaimer/disclaimer.component";
import { CioComponent } from "./cio/cio.component";
import { ProfileComponent } from "./profile/profile.component";
import { PublicationListsComponent } from "./publication-lists/publication-lists.component";

export const CoreRoutes: Routes = [
  {
    path: "landing",
    component: LandingComponent,
  },
  {
    path: "password-reset/confirm/:uid/:token",
    component: PasswordResetComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "contact-us",
    component: ContactUsComponent,
  },
  {
    path: "exhibit",
    children: [
      {
        path: "",
        component: ExhibitComponent,
      },
      {
        path: "lists/:zone",
        component: ExhibitListsComponent,
      },
      {
        path: "lists/:zone/:detail",
        component: ExhibitDetailsComponent,
      },
    ],
  },
  {
    path: "facility",
    children: [
      {
        path: "",
        component: FacilityComponent,
      },
      {
        path: "details/:id",
        component: FacilityDetailsComponent,
      },
      {
        path: "details/:id/:zone",
        component: FacilityDetailZonesComponent,
      },
    ],
  },
  {
    path: "payment",
    component: PaymentComponent,
  },
  {
    path: "program",
    children: [
      {
        path: "",
        component: ProgramComponent,
      },
      {
        path: "forms/:id",
        component: ProgramFormsComponent,
      },
    ],
  },
  {
    path: "publication",
    children: [
      {
        path: "",
        component: PublicationComponent,
      },
      {
        path: "lists/:id",
        component: PublicationListsComponent,
      },
    ],
  },
  {
    path: "shows",
    children: [
      {
        path: "",
        component: ShowsComponent,
      },
      {
        path: "show-details",
        component: ShowDetailsComponent,
      },
      {
        path: "shows-book/:id",
        component: ShowsBookComponent,
      },
    ],
  },
  {
    path: "survey",
    component: SurveyComponent,
  },
  {
    path: "ticketing",
    component: TicketingComponent,
  },
  {
    path: "visit",
    component: VisitComponent,
  },
  {
    path: "payment-facility",
    component: PaymentFacilityComponent,
  },
  {
    path: "simulator-ride",
    children: [
      {
        path: "",
        component: SimulatorRideComponent,
      },
      {
        path: "simulator-ride-book",
        component: SimulatorRideBookComponent,
      },
    ],
  },
  {
    path: "virtual-library",
    component: VirtualLibraryComponent,
  },
  {
    path: "about-us",
    component: AboutUsComponent,
  },
  {
    path: "organization-chart",
    component: OrganizationChartComponent,
  },
  {
    path: "mission-vision",
    component: MissionVisionComponent,
  },
  {
    path: "operating-hour",
    component: OperatingHourComponent,
  },
  {
    path: "directory",
    component: DirectoryComponent,
  },
  {
    path: "pdpa",
    component: PdpaComponent,
  },
  {
    path: "faq",
    component: FaqComponent,
  },
  {
    path: "noc",
    component: NocComponent,
  },
  {
    path: "charter",
    component: CharterComponent,
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent,
  },
  {
    path: "copyright-notice",
    component: CopyrightNoticeComponent,
  },
  {
    path: "disclaimer",
    component: DisclaimerComponent,
  },
  {
    path: "cio",
    component: CioComponent,
  },
];
