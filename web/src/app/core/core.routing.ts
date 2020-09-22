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

export const CoreRoutes: Routes = [
  {
    path: "landing",
    component: LandingComponent,
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
        path: "details",
        component: ExhibitDetailsComponent,
      },
    ],
  },
  {
    path: "facility",
    component: FacilityComponent,
  },
  {
    path: "payment",
    component: PaymentComponent,
  },
  {
    path: "program",
    component: ProgramComponent,
  },
  {
    path: "publication",
    component: PublicationComponent,
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
        path: "shows-book",
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
    path: "facility-details/:id",
    component: FacilityDetailsComponent,
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
    path: "pdpa",
    component: PdpaComponent,
  },
  {
    path: "faq",
    component: FaqComponent,
  },
];
